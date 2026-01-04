import { NextResponse } from "next/server";
import { chargeSubscriptions } from "@/app/example-05-subscription/cron/Subscription";

export async function POST() {
  await chargeSubscriptions();
  return NextResponse.json({
    success: true,
    note: "Execution trigger fired",
  });
}
