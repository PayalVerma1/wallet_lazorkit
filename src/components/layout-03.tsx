"use client";

import { ExampleLayout } from "@/src/components/ExampleLayout";
import { useWallet } from "@lazorkit/wallet";

export default function Example03PayWidget() {
  const { isConnected, connect } = useWallet();

  return (
    <ExampleLayout
      title="Example 03: Pay with Solana Widget"
      description="A simple checkout-style payment flow where users can pay with Solana using passkeys, without installing any wallet."
      learnPoints={[
        "Embedding Solana payments directly into a web app",
        "Using passkey wallets for one-click payments",
        "Removing wallet extensions from checkout UX",
        "Building Web2-like payment flows on Solana",
      ]}
      howItWorks={[
        {
          title: "User Connects via Passkey",
          text:
            "The user connects using Face ID / Touch ID instead of a browser wallet extension.",
        },
        {
          title: "Payment Transaction Created",
          text:
            "Your app constructs a Solana transfer instruction for the payment amount.",
        },
        {
          title: "Transaction Signed and Sent",
          text:
            "The payment is signed with the passkey and submitted on-chain seamlessly.",
        },
      ]}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        {!isConnected ? (
          <button
            onClick={() => connect()}
            className="border px-6 py-3 rounded"
          >
            Connect Wallet to Pay
          </button>
        ) : (
          <p className="text-sm text-gray-400">
            Wallet connected. Payment logic goes here.
          </p>
        )}
      </div>
    </ExampleLayout>
  );
}
