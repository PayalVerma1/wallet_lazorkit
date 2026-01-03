"use client";
import { useWallet } from "@lazorkit/wallet";
import { PublicKey } from "@solana/web3.js";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

// Merchant wallet (subscription owner)
const MERCHANT = new PublicKey("EEE2dZ4EHFHmgG24zKgVUutCXQqtYTLJCEAWoNcNAXTj");

export default function Subscription() {
  const { isConnected, smartWalletPubkey, signAndSendTransaction } =
    useWallet();

  async function subscribe() {
    if (!smartWalletPubkey) return;

    const fromATA = await getAssociatedTokenAddress(
      USDC_MINT,
      smartWalletPubkey,
      true
    );
    const toATA = await getAssociatedTokenAddress(USDC_MINT, MERCHANT, true);

    const instruction = createTransferInstruction(
      fromATA,
      toATA,
      smartWalletPubkey,
      5_000_000
    );

    await signAndSendTransaction({
      instructions: [instruction],
      transactionOptions: {
        feeToken: "USDC",
      },
    });
    // Save subscription on backend
    await fetch("/api/subscription/create", {
      method: "POST",
      body: JSON.stringify({
        smartWallet: smartWalletPubkey.toBase58(),
      }),
    });
    alert("Subscription activated!");
  }

  return (
    <button
      onClick={subscribe}
      className="px-6 py-3 rounded-lg
    border border-orange-400
    text-orange-400 font-medium
    transition
    hover:bg-orange-400 hover:text-black
    disabled:opacity-40 disabled:cursor-not-allowed
    disabled:hover:bg-transparent disabled:hover:text-orange-400
  "
      disabled={!isConnected}
    >
      Authorize $5/month subscription
    </button>
  );
}
