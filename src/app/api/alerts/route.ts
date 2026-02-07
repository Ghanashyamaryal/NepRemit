import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { RateAlert } from "@/models/RateAlert";
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
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const alerts = await RateAlert.find({
      userId: session.user.id,
    }).sort({ createdAt: -1 });

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
    const session = await auth();

    if (!session?.user?.id) {
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

    await connectDB();

    // Check for existing similar alert
    const existingAlert = await RateAlert.findOne({
      userId: session.user.id,
      baseCurrency,
      targetCurrency,
      targetRate,
      direction,
      isActive: true,
    });

    if (existingAlert) {
      return NextResponse.json(
        { error: "A similar alert already exists" },
        { status: 409 }
      );
    }

    // Limit number of active alerts per user
    const activeAlertCount = await RateAlert.countDocuments({
      userId: session.user.id,
      isActive: true,
    });

    if (activeAlertCount >= 10) {
      return NextResponse.json(
        { error: "Maximum 10 active alerts allowed" },
        { status: 400 }
      );
    }

    const alert = await RateAlert.create({
      userId: session.user.id,
      currencyPair: `${baseCurrency}/${targetCurrency}`,
      baseCurrency,
      targetCurrency,
      targetRate,
      direction,
    });

    return NextResponse.json({ data: alert }, { status: 201 });
  } catch (error) {
    console.error("Error creating alert:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
