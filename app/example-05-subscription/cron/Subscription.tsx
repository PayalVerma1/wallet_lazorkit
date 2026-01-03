import { subscriptions } from "@/src/providers/db";
import { PublicKey } from "@solana/web3.js";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

const MERCHANT = new PublicKey(
  "EEE2dZ4EHFHmgG24zKgVUutCXQqtYTLJCEAWoNcNAXTj"
);

/**
 * Charge all due subscriptions.
 *
 * This function is kept transport-agnostic: provide a `lazorkit` client
 * that exposes `signAndSendTransaction` when calling from a server worker
 * or another runtime that can sign on behalf of the smart wallet via
 * Lazorkit's server API.
 */
export async function chargeSubscriptions(lazorkit: {
  signAndSendTransaction: (opts: {
    smartWallet: PublicKey;
    instructions: any[];
    transactionOptions?: { feeToken?: string };
  }) => Promise<string>;
}) {
  for (const sub of subscriptions) {
    try {
      if (!sub.active) continue;
      if (Date.now() < sub.nextChargeAt) continue;

      const wallet = new PublicKey(sub.smartWallet);

    // Lazorkit smart wallets are PDAs (off-curve); allowOwnerOffCurve must be true
    const fromATA = await getAssociatedTokenAddress(USDC_MINT, wallet, true);
    const toATA = await getAssociatedTokenAddress(USDC_MINT, MERCHANT, true);

      const ix = createTransferInstruction(fromATA, toATA, wallet, BigInt(sub.amount));

      const signature = await lazorkit.signAndSendTransaction({
        smartWallet: wallet,
        instructions: [ix],
        transactionOptions: {
          feeToken: "USDC",
        },
      });

      // Advance next charge only on success
      sub.nextChargeAt = Date.now() + 30 * 24 * 60 * 60 * 1000;

      // eslint-disable-next-line no-console
      console.log(`Charged ${sub.smartWallet} — tx ${signature}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Failed to charge subscription for ${sub.smartWallet}:`, err);
      // don't advance nextChargeAt so we'll retry on the next run
    }
  }
}
