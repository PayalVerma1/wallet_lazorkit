"use client";

import { useWallet } from "@lazorkit/wallet";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export function PayWithSolanaButton() {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();

  const handlePay = async () => {
    if (!smartWalletPubkey) return;

    const instruction = SystemProgram.transfer({
      fromPubkey: smartWalletPubkey,
      toPubkey: new PublicKey(
        "EEE2dZ4EHFHmgG24zKgVUutCXQqtYTLJCEAWoNcNAXTj"
      ),
      lamports: Math.floor(0.05 * LAMPORTS_PER_SOL),
    });

    await signAndSendTransaction({
      instructions: [instruction],
      transactionOptions: {
        feeToken: "USDC",
      },
    });

    alert("Payment successful!");
  };

  return (
    <button onClick={handlePay} className="px-6 py-3 rounded-lg
    border border-orange-400
    text-orange-400 font-medium
    transition
    hover:bg-orange-400 hover:text-black
    disabled:opacity-40 disabled:cursor-not-allowed
    disabled:hover:bg-transparent disabled:hover:text-orange-400
  ">
      Pay ₹99 with Solana
    </button>
  );
}
