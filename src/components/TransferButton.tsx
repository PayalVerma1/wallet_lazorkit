"use client";

import { useWallet } from "@lazorkit/wallet";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

const RECIPIENT = new PublicKey(
  "EEE2dZ4EHFHmgG24zKgVUutCXQqtYTLJCEAWoNcNAXTj"
);

export function TransferButton() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();

  const handleTransfer = async () => {
    if (!smartWalletPubkey) return;

    // 1 USDC = 1_000_000 (6 decimals)
    const amount = 1_000_000;

    // Sender USDC ATA
    const fromTokenAccount = await getAssociatedTokenAddressSync(
      USDC_MINT,
      smartWalletPubkey,
      true,
    );

    // Recipient USDC ATA
    const toTokenAccount = await getAssociatedTokenAddress(
      USDC_MINT,
      RECIPIENT
    );

    // Create USDC transfer instruction
    const instruction = createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      smartWalletPubkey,
      amount
    );

    // Gasless send
    await signAndSendTransaction({
      instructions: [instruction],
      transactionOptions: {
        feeToken: "USDC", // pay gas in USDC
      },
    });

    alert("USDC transfer successful!");
  };

  return (
    <button onClick={handleTransfer} className="px-6 py-3 rounded-lg
    border border-orange-400
    text-orange-400 font-medium
    transition
    hover:bg-orange-400 hover:text-black
    disabled:opacity-40 disabled:cursor-not-allowed
    disabled:hover:bg-transparent disabled:hover:text-orange-400
  ">
      Send 1 USDC (Gasless)
    </button>
  );
}
