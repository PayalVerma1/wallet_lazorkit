import { NextResponse } from "next/server";
import Subscription from "@/src/components/subscription";

export async function POST() {
  try {
    await Subscription();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
