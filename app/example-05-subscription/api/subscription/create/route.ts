import { NextResponse } from "next/server";
import { subscriptions } from "@/src/providers/db";

export async function POST(req: Request) {
  const body = await req.json();

  subscriptions.push({
    smartWallet: body.smartWallet,
    amount: 1_000_000,
    nextChargeAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    active: true,
  });

  return NextResponse.json({ success: true });
}
