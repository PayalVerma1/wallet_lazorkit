import { subscriptions } from "@/src/providers/db";

/**
 * Charge all due subscriptions.
 *
 * IMPORTANT:
 * - Lazorkit smart wallets sign transactions in the browser via passkeys.
 * - There is NO public server-side signing API in the Lazorkit SDK.
 *
 * Therefore this cron job:
 * - controls WHEN a subscription is due
 * - triggers execution (log / webhook / queue)
 * - updates billing schedule
 *
 * Actual transaction signing is delegated to Lazorkit’s smart wallet
 * infrastructure when execution is performed.
 */
export async function chargeSubscriptions() {
  const now = Date.now();

  for (const sub of subscriptions) {
    try {
      // Skip inactive subscriptions
      if (!sub.active) continue;

      // Skip if not yet due
      if (now < sub.nextChargeAt) continue;

      /**
       *  EXECUTION TRIGGER
       *
       * In a real system, this is where you would:
       * - enqueue a job
       * - notify the client
       * - trigger a Lazorkit-managed execution flow
       *
       * We DO NOT sign transactions here.
       */
      console.log("Subscription due:", {
        smartWallet: sub.smartWallet,
        amount: sub.amount,
      });

      // Advance billing cycle (monthly)
      sub.nextChargeAt =
        now + 30 * 24 * 60 * 60 * 1000;

      console.log(
        `Next charge scheduled for ${new Date(
          sub.nextChargeAt
        ).toISOString()}`
      );
    } catch (err) {
      console.error(
        `Failed to process subscription for ${sub.smartWallet}:`,
        err
      );
      // Do NOT advance nextChargeAt on failure
    }
  }
}
