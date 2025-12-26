"use client";

import Image from "next/image";
import {CodeBlock} from "@/src/components/CodeBlock";
import { ExampleLayout } from "@/src/components/ExampleLayout";
import { ConnectButton } from "@/src/components/ConnectButton";
import { PayWithSolanaButton } from "@/src/components/PayWithSolanaButton";
import { WalletInfo } from "@/src/components/WalletInfo";
import { useWallet } from "@lazorkit/wallet";
const TRANSFER_CODE = `import { useWallet } from "@lazorkit/wallet";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export function PayWithSolanaButton() {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();

  const handlePay = async () => {
    if (!smartWalletPubkey) return;

    const instruction = SystemProgram.transfer({
      fromPubkey: smartWalletPubkey,
      toPubkey: new PublicKey(""),
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

  return <button onClick={handlePay}>Pay ₹99 with Solana</button>;
}
`;

export default function PayWidgetExample() {
  const { isConnected } = useWallet();

  return (
    <ExampleLayout
      title="Example 03: Pay with Solana Widget"
      description="This example shows how to embed a simple checkout-style payment flow into a web app using Lazorkit passkey wallets, without requiring wallet extensions."
      learnPoints={[
        "Embedding Solana payments directly into a frontend",
        "Using passkey-based wallets for one-click payments",
        "Abstracting blockchain complexity from users",
        "Designing Web2-like checkout flows on Solana",
      ]}
      howItWorks={[
        {
          title: "User Authentication",
          text:
            "The user connects using a passkey instead of installing a browser wallet.",
        },
        {
          title: "Payment Instruction",
          text:
            "The app constructs a Solana transfer instruction representing the payment.",
        },
        {
          title: "Seamless Payment",
          text:
            "The transaction is signed with the passkey and sent on-chain with gas fees sponsored.",
        },
      ]}
      codeExample={
        <>
          <h2 className="text-xl font-semibold">
            Code Example
          </h2>

          <p className="text-sm text-white/60 max-w-2xl">
            Minimal “Pay with Solana” widget implementation using Lazorkit.
            This pattern enables Web2-style checkout experiences backed
            by Solana smart wallets.
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
            <PayWithSolanaButton />
          </>
        )}
      </div>
    </ExampleLayout>
  );
}
