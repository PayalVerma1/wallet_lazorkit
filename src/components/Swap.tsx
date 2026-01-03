"use client";

import { useWallet } from "@lazorkit/wallet";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Buffer } from "buffer";

export default function Swap() {
  const { smartWalletPubkey, isConnected, signAndSendTransaction } = useWallet();

  function b64ToU8(b64: string) {
    return Buffer.from(b64, "base64");
  }

  async function handleSwap() {
    if (!isConnected || !smartWalletPubkey) return;

    // Ask backend / Jupiter for swap instructions
    const res = await fetch("/api/swap-route", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        inMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
        outMint: "So11111111111111111111111111111111111111112", // SOL
        amount: 5_000_000, // 5 USDC
        user: smartWalletPubkey.toBase58(),
      }),
    });

    if (!res.ok) throw new Error("Failed to get swap route");

    const { instructions } = await res.json();

    // Rebuild instructions
    const ixs = instructions.map(
      (ix: any) =>
        new TransactionInstruction({
          programId: new PublicKey(ix.programId),
          keys: ix.keys.map((k: any) => ({
            pubkey: new PublicKey(k.pubkey),
            isSigner: k.isSigner,
            isWritable: k.isWritable,
          })),
          data: b64ToU8(ix.data),
        })
    );

    // Lazorkit signs & sends (gasless)
    await signAndSendTransaction({
      instructions: ixs,
      transactionOptions: { feeToken: "USDC" },
    });
  }

  return (
    <button
      onClick={handleSwap}
      disabled={!isConnected}
      className="px-6 py-3 rounded-lg border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black"
    >
      Swap USDC → SOL
    </button>
  );
}
