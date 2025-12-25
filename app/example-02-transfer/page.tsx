"use client";

import Image from "next/image";
import { ExampleLayout } from "@/src/components/ExampleLayout";
import { ConnectButton } from "@/src/components/ConnectButton";
import { TransferButton } from "@/src/components/TransferButton";
import { WalletInfo } from "@/src/components/WalletInfo";
import { useWallet } from "@lazorkit/wallet";

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
            <Image
              src="/code-examples/gasless-transfer.png"
              alt="Minimal Lazorkit gasless SOL transfer example"
              width={900}
              height={450}
              className="w-full h-auto"
            />
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
