"use client";

import { useWallet } from "@lazorkit/wallet";
import {
  PublicKey,
  TransactionInstruction,
  AccountMeta,
} from "@solana/web3.js";

type JupiterInstruction = {
  programId: string;
  keys: {
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
  }[];
  data: string; // base64
};

type SwapRouteResponse = {
  instructions: JupiterInstruction[];
};

export default function Swap() {
  const { smartWalletPubkey, isConnected, signAndSendTransaction } = useWallet();

  function base64ToBuffer(data: string): Buffer {
    return Buffer.from(data, "base64");
  }

  async function swap(): Promise<void> {
    if (!isConnected || !smartWalletPubkey) return;

  const res = await fetch("/api/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inMint: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU", // USDC (devnet)
        outMint: "So11111111111111111111111111111111111111112", // SOL
        amount: 1_000_000,
        user: smartWalletPubkey.toBase58(),
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch swap route");
    }

    const { instructions }: SwapRouteResponse = await res.json();

    const txInstructions: TransactionInstruction[] = instructions.map(
      (ix): TransactionInstruction =>
        new TransactionInstruction({
          programId: new PublicKey(ix.programId),
          keys: ix.keys.map(
            (k): AccountMeta => ({
              pubkey: new PublicKey(k.pubkey),
              isSigner: k.isSigner,
              isWritable: k.isWritable,
            })
          ),
          data: base64ToBuffer(ix.data), // ✅ Buffer, not Uint8Array
        })
    );

    await signAndSendTransaction({
      instructions: txInstructions,
    });
  }

  return (
    <button
      onClick={swap}
      disabled={!isConnected}
      className="px-6 py-3 rounded-lg border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black"
    >
      Swap USDC → SOL
    </button>
  );
}
