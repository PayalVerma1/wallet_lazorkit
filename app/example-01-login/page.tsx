"use client";

import Image from "next/image";
import { ExampleLayout } from "@/src/components/ExampleLayout";
import { ConnectButton } from "@/src/components/ConnectButton";
import { WalletInfo } from "@/src/components/WalletInfo";
import { CodeBlock } from "@/src/components/CodeBlock";

const LOGIN_CODE = `import { useWallet } from "@lazorkit/wallet";

export function ConnectButton() {
  const {
    connect,
    disconnect,
    isConnected,
    isConnecting,
    smartWalletPubkey,
  } = useWallet();

  if (isConnected && smartWalletPubkey) {
    return (
      <button onClick={disconnect}>
        Disconnect ({smartWalletPubkey.toBase58().slice(0, 6)}...)
      </button>
    );
  }

  return (
    <button onClick={() => connect()} disabled={isConnecting}>
      {isConnecting ? "Connecting..." : "Connect with Passkey"}
    </button>
  );
}`;

export default function Example01Login() {
  return (
    <ExampleLayout
      title="Example 01: Passkey Login with Smart Wallet"
      description="Learn how to create a Solana smart wallet using passkey authentication (Face ID / Touch ID) with Lazorkit."
      learnPoints={[
        "Passkey-based authentication using WebAuthn",
        "Automatic smart wallet creation on Solana",
        "Connect and disconnect wallet sessions",
        "No browser extensions or seed phrases",
      ]}
      howItWorks={[
        {
          title: "Passkey Authentication",
          text:
            "Instead of seed phrases, Lazorkit uses WebAuthn passkeys (Face ID / Touch ID) to securely authenticate users.",
        },
        {
          title: "Smart Wallet Creation",
          text:
            "After authentication, Lazorkit generates a smart wallet address on Solana that can hold tokens and interact with programs.",
        },
        {
          title: "Session Management",
          text:
            "The wallet session is managed in the app, allowing users to disconnect without interacting with the portal.",
        },
      ]}
      codeExample={
        <>
          <h2 className="text-xl font-semibold">Code Example</h2>

          <p className="text-sm text-white/60 max-w-2xl">
            Minimal Lazorkit passkey login example. One hook is enough to
            access the full smart wallet functionality.
          </p>

          <div className="border border-white/15 rounded-lg overflow-hidden">
           <CodeBlock code={LOGIN_CODE} />

          </div>
        </>
      }
    >
      <div className="flex flex-col items-center gap-4">
        <ConnectButton />
        <WalletInfo />
      </div>
    </ExampleLayout>
  );
}
