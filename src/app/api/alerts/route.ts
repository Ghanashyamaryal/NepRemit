import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const createAlertSchema = z.object({
  baseCurrency: z.string().length(3, "Currency code must be 3 characters"),
  targetCurrency: z.string().length(3).default("NPR"),
  targetRate: z.number().positive("Target rate must be positive"),
  direction: z.enum(["above", "below"]),
});

// GET /api/alerts - Get all alerts for current user
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: alerts, error } = await supabase
      .from("rate_alerts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data: alerts });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/alerts - Create new alert
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = createAlertSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { baseCurrency, targetCurrency, targetRate, direction } =
      validation.data;

    // Check for existing similar alert
    const { data: existing } = await supabase
      .from("rate_alerts")
      .select("id")
      .eq("user_id", user.id)
      .eq("base_currency", baseCurrency)
      .eq("target_currency", targetCurrency)
      .eq("target_rate", targetRate)
      .eq("direction", direction)
      .eq("is_active", true)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "A similar alert already exists" },
        { status: 409 }
      );
    }

    // Limit number of active alerts per user
    const { count } = await supabase
      .from("rate_alerts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_active", true);

    if (count !== null && count >= 10) {
      return NextResponse.json(
        { error: "Maximum 10 active alerts allowed" },
        { status: 400 }
      );
    }

    const { data: alert, error } = await supabase
      .from("rate_alerts")
      .insert({
        user_id: user.id,
        currency_pair: `${baseCurrency}/${targetCurrency}`,
        base_currency: baseCurrency,
        target_currency: targetCurrency,
        target_rate: targetRate,
        direction,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data: alert }, { status: 201 });
  } catch (error) {
    console.error("Error creating alert:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
