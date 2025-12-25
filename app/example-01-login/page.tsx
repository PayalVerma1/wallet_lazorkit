"use client";

import Image from "next/image";
import { ExampleLayout } from "@/src/components/ExampleLayout";
import { ConnectButton } from "@/src/components/ConnectButton";
import { WalletInfo } from "@/src/components/WalletInfo";

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
            <Image
              src="/Images/image.png"
              alt="Lazorkit passkey login screenshot"
              width={900}
              height={450}
              className="w-full h-auto"
            />
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
