"use client";

import Image from "next/image";
import { CodeBlock } from "@/src/components/CodeBlock";
import { ExampleLayout } from "@/src/components/ExampleLayout";
import { ConnectButton } from "@/src/components/ConnectButton";
import { TransferButton } from "@/src/components/TransferButton";
import { WalletInfo } from "@/src/components/WalletInfo";
import { useWallet } from "@lazorkit/wallet";
const TRANSFER_CODE = `import { useWallet } from "@lazorkit/wallet";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from "@solana/spl-token";
import { PublicKey, Connection } from "@solana/web3.js";

const USDC_MINT = new PublicKey(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU" // Devnet USDC
);

const RECIPIENT = new PublicKey("");

export function GaslessUSDCTransfer() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();

  async function sendUSDC() {
    if (!smartWalletPubkey) return;

    const amount = 1_000_000; // 1 USDC (6 decimals)
    const instructions = [];

    // Smart wallets are off-curve → pass true
    const fromATA = await getAssociatedTokenAddress(
      USDC_MINT,
      smartWalletPubkey,
      true
    );

    const toATA = await getAssociatedTokenAddress(
      USDC_MINT,
      RECIPIENT
    );

    // Create recipient ATA if missing
    const connection = new Connection("https://api.devnet.solana.com");
    const toInfo = await connection.getAccountInfo(toATA);

    if (!toInfo) {
      instructions.push(
        createAssociatedTokenAccountInstruction(
          smartWalletPubkey,
          toATA,
          RECIPIENT,
          USDC_MINT
        )
      );
    }

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
      transactionOptions: { feeToken: "USDC" },
    });
  }

  return <button onClick={sendUSDC}>Send 1 USDC (Gasless)</button>;
}
`;

export default function TransferExample() {
  const { isConnected } = useWallet();

  return (
    <ExampleLayout
      title="Example 02: Gasless USDC Transfer"
      description="This example demonstrates how to send USDC on Solana without requiring the user to hold SOL for gas fees, using Lazorkit smart wallets and a paymaster."
      learnPoints={[
        "Sending USDC using the SPL Token Program",
        "Executing transactions from a smart wallet",
        "Sponsoring gas fees using Lazorkit paymaster",
        "Signing transactions securely with passkeys",
      ]}
      howItWorks={[
        {
          title: "Smart Wallet as Sender",
          text: "The USDC transfer is initiated from the Lazorkit smart wallet created during passkey login.",
        },
        {
          title: "Gasless Transaction",
          text: "Instead of the user paying SOL for gas, Lazorkit’s paymaster sponsors the transaction fee.",
        },
        {
          title: "Passkey Signing",
          text: "The user authorizes the transaction using Face ID / Touch ID through WebAuthn.",
        },
      ]}
      codeExample={
        <>
          <h2 className="text-xl font-semibold">Code Example</h2>

          <p className="text-sm text-white/60 max-w-2xl">
            Minimal gasless USDC transfer implementation using Lazorkit. This
            snippet shows how a smart wallet signs and sends an SPL token
            transaction with fees sponsored by a paymaster.
          </p>

          <div className="border border-[#2dd4bf] rounded-lg overflow-hidden">
            <CodeBlock code={TRANSFER_CODE} />
          </div>
        </>
      }
    >
      <div className="flex flex-col items-center gap-4">
        {!isConnected && <ConnectButton />}

        {isConnected && (
          <>
            <WalletInfo />
            <TransferButton />
          </>
        )}
      </div>
    </ExampleLayout>
  );
}
