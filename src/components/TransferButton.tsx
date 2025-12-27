"use client";

import { useWallet } from "@lazorkit/wallet";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import { PublicKey, Connection } from "@solana/web3.js";

const USDC_MINT = new PublicKey(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU" // Devnet USDC
);

const RECIPIENT = new PublicKey(
  "EEE2dZ4EHFHmgG24zKgVUutCXQqtYTLJCEAWoNcNAXTj"
);

export function TransferButton() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();

  const handleTransfer = async () => {
    if (!smartWalletPubkey) return;

    const amount = 1_000_000; // 1 USDC
    const instructions = [];

    const fromATA = await getAssociatedTokenAddress(
      USDC_MINT,
      smartWalletPubkey,
      true,
    );

    const toATA = await getAssociatedTokenAddress(
      USDC_MINT,
      RECIPIENT
    );

    //  Check if recipient ATA exists
    const connection = new Connection("https://api.devnet.solana.com");
    const toAccountInfo = await connection.getAccountInfo(toATA);

    if (!toAccountInfo) {
      instructions.push(
        createAssociatedTokenAccountInstruction(
          smartWalletPubkey,
          toATA,
          RECIPIENT,
          USDC_MINT
        )
      );
    }

    // Transfer
    instructions.push(
      createTransferInstruction(
        fromATA,
        toATA,
        smartWalletPubkey,
        amount
      )
    );

    await signAndSendTransaction({
      instructions,
      transactionOptions: {
        feeToken: "USDC",
      },
    });

    alert("USDC transfer successful!");
  };

  return (
    <button
      onClick={handleTransfer}
      className="px-6 py-3 rounded-lg border border-orange-400
      text-orange-400 font-medium transition
      hover:bg-orange-400 hover:text-black"
    >
      Send 1 USDC (Gasless)
    </button>
  );
}
