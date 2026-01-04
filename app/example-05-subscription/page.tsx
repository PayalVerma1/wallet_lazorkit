"use client";
import { ExampleLayout } from "@/src/components/ExampleLayout";
import { ConnectButton } from "@/src/components/ConnectButton";
import { WalletInfo } from "@/src/components/WalletInfo";
import { CodeBlock } from "@/src/components/CodeBlock";
import { useWallet } from "@lazorkit/wallet";
import Subscription from "@/src/components/subscription";
const SUBSCRIPTION_CODE = `import { useWallet } from "@lazorkit/wallet";
import { PublicKey } from "@solana/web3.js";
import { createTransferInstruction } from "@solana/spl-token";

const MERCHANT = new PublicKey("MERCHANT_WALLET_ADDRESS");

export function SubscribeButton() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();

  async function subscribe() {
    if (!smartWalletPubkey) return;

    // Build a USDC payment instruction (represents one billing cycle)
    const ix = createTransferInstruction(
      smartWalletPubkey, // payer (simplified for example)
      MERCHANT,          // subscription owner
      smartWalletPubkey,
      5_000_000          // 5 USDC (6 decimals)
    );

    // Lazorkit signs & sends using passkeys (no wallet extensions)
    await signAndSendTransaction({
      instructions: [ix],
      transactionOptions: { feeToken: "USDC" },
    });
  }

  return <button onClick={subscribe}>Subscribe – 5 USDC / month</button>;
}
`;

export default function Example05Subscription() {
  const { isConnected } = useWallet();

  return (
    <ExampleLayout
      title="Example 05: Subscription Service with USDC Billing"
      description="This example shows how Lazorkit smart wallets can power subscription-style payments using USDC, without requiring users to manage gas or private keys."
      learnPoints={[
        "Authorizing payments using passkeys",
        "Using smart wallets for recurring billing logic",
        "Sending USDC without requiring SOL for gas",
        "Building subscription-style payment flows",
      ]}
      howItWorks={[
        {
          title: "Wallet Authorization",
          text: "The user connects once using passkey authentication.",
        },
        {
          title: "USDC Payment Instruction",
          text: "A USDC transfer instruction represents the subscription charge.",
        },
        {
          title: "Gasless Billing",
          text: "Lazorkit paymaster sponsors the transaction fee.",
        },
      ]}
      codeExample={
        <>
          <h2 className="text-xl font-semibold">Code Example</h2>
          <p className="text-sm text-white/60 max-w-2xl">
            Minimal subscription-style USDC billing using Lazorkit smart
            wallets.
          </p>
          <div className="border border-white/15 rounded-lg p-4">
            <CodeBlock code={SUBSCRIPTION_CODE} />
          </div>
        </>
      }
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4">
          {!isConnected && <ConnectButton />}

          {isConnected && (
            <>
              <WalletInfo />
              <Subscription />
            </>
          )}
        </div>
      </div>
    </ExampleLayout>
  );
}
