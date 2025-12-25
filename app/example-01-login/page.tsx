"use client";

import { ConnectButton } from "@/src/components/ConnectButton";
import { WalletInfo } from "@/src/components/WalletInfo";

export default function LoginExample() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">
        Example 01: Passkey Login with Smart Wallet
      </h1>
      <p className="max-w-md text-center">
        This example demonstrates passkey-based authentication using Lazorkit
        and automatic creation of a smart wallet on Solana.
      </p>
      <ConnectButton />
      <WalletInfo />
    </div>
  );
}
