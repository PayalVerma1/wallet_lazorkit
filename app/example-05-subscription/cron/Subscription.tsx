import { subscriptions } from "@/src/providers/db";
import { PublicKey } from "@solana/web3.js";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import {LazorkitAppProvider} from "@/src/providers/lazorkit";

const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

const MERCHANT = new PublicKey(
  "EEE2dZ4EHFHmgG24zKgVUutCXQqtYTLJCEAWoNcNAXTj"
);

export async function chargeSubscriptions() {
  for (const sub of subscriptions) {
    try {
      if (!sub.active) continue;
      if (Date.now() < sub.nextChargeAt) continue;

      const wallet = new PublicKey(sub.smartWallet);

      const fromATA = await getAssociatedTokenAddress(
        USDC_MINT,
        wallet,
        true
      );
      const toATA = await getAssociatedTokenAddress(
        USDC_MINT,
        MERCHANT,
        true
      );

      const ix = createTransferInstruction(
        fromATA,
        toATA,
        wallet,
        BigInt(sub.amount)
      );

      const signature = await (LazorkitAppProvider as any).signAndSendTransaction({
        smartWallet: wallet,
        instructions: [ix],
        transactionOptions: {
          feeToken: "USDC",
        },
      });

      sub.nextChargeAt =
        Date.now() + 30 * 24 * 60 * 60 * 1000;

      console.log(`Charged ${sub.smartWallet} — tx ${signature}`);
    } catch (err) {
      console.error(
        `Failed to charge ${sub.smartWallet}:`,
        err
      );
    }
  }
}
