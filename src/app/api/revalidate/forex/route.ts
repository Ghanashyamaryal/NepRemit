import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token =
    request.nextUrl.searchParams.get("token") ??
    request.headers.get("x-revalidate-token");

  if (!process.env.REVALIDATE_TOKEN) {
    return NextResponse.json(
      { error: "REVALIDATE_TOKEN is not configured" },
      { status: 500 }
    );
  }

  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/forex");

  return NextResponse.json({
    revalidated: true,
    path: "/forex",
    at: new Date().toISOString(),
  });
}
