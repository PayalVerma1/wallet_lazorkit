import { NextResponse } from "next/server";
import { chargeSubscriptions } from "@/app/example-05-subscription/cron/Subscription";

/**
 * API route to trigger charging of due subscriptions.
 *
 * NOTE: This endpoint currently runs `chargeSubscriptions` with a stubbed
 * lazorkit client which only logs the intent. To make this endpoint
 * actually process payments, replace the `stubLazorkit` implementation
 * with a server-side Lazorkit client that can call `signAndSendTransaction`
 * (for example an authenticated service account or an API wrapper).
 */
export async function POST(req: Request) {
  try {
    const stubLazorkit = {
      signAndSendTransaction: async (_opts: any) => {
        console.log("Stub signAndSendTransaction called:", _opts);
        throw new Error("No server-side Lazorkit client configured");
      },
    };

    await chargeSubscriptions(stubLazorkit as any);

    return NextResponse.json({ success: true, note: "ran with stub client" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err?.message || err) }, { status: 500 });
  }
}
