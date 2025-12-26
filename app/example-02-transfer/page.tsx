"use client";

import Image from "next/image";
import {CodeBlock} from "@/src/components/CodeBlock";
import { ExampleLayout } from "@/src/components/ExampleLayout";
import { ConnectButton } from "@/src/components/ConnectButton";
import { TransferButton } from "@/src/components/TransferButton";
import { WalletInfo } from "@/src/components/WalletInfo";
import { useWallet } from "@lazorkit/wallet";
const TRANSFER_CODE = `import { useWallet } from "@lazorkit/wallet";
import { createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const RECIPIENT = new PublicKey("EEE2dZ4EHFHmgG24zKgVUutCXQqtYTLJCEAWoNcNAXTj");

export function GaslessUSDCTransfer() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();

  async function sendUSDC() {
    if (!smartWalletPubkey) return;

    const from = await getAssociatedTokenAddress(USDC_MINT, smartWalletPubkey);
    const to = await getAssociatedTokenAddress(USDC_MINT, RECIPIENT);

    const ix = createTransferInstruction(
      from,
      to,
      smartWalletPubkey,
      1_000_000 // 1 USDC
    );

    await signAndSendTransaction({
      instructions: [ix],
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
      title="Example 02: Gasless SOL Transfer"
      description="This example demonstrates how to send SOL on Solana without requiring the user to hold SOL for gas fees, using Lazorkit smart wallets and paymaster."
      learnPoints={[
        "Sending SOL using Solana’s System Program",
        "Executing transactions from a smart wallet",
        "Sponsoring gas fees using Lazorkit paymaster",
        "Signing transactions securely with passkeys",
      ]}
      howItWorks={[
        {
          title: "Smart Wallet as Sender",
          text:
            "The SOL transfer is initiated from the Lazorkit smart wallet created during passkey login.",
        },
        {
          title: "Gasless Transaction",
          text:
            "Instead of the user paying SOL for gas, Lazorkit’s paymaster sponsors the transaction fee.",
        },
        {
          title: "Passkey Signing",
          text:
            "The user authorizes the transaction using Face ID / Touch ID through WebAuthn.",
        },
      ]}
      codeExample={
        <>
          <h2 className="text-xl font-semibold">
            Code Example
          </h2>

          <p className="text-sm text-white/60 max-w-2xl">
            Minimal gasless transfer implementation using Lazorkit.
            This snippet shows how a smart wallet signs and sends
            a transaction with fees sponsored by a paymaster.
          </p>

          <div className="border border-white/15 rounded-lg overflow-hidden">
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
