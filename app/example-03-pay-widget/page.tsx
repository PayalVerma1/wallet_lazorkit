"use client";

import { ConnectButton } from "@/src/components/ConnectButton";
import { PayWithSolanaButton } from "@/src/components/PayWithSolanaButton";
import { useWallet } from "@lazorkit/wallet";

export default function PayWidgetExample() {
  const { isConnected } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Example 02: Pay with Solana</h1>

      <p className="text-center max-w-md">
        This example demonstrates a reusable “Pay with Solana” widget using
        Lazorkit. Users can pay without installing a wallet or holding SOL.
      </p>

      {!isConnected && <ConnectButton />}
      {isConnected && <PayWithSolanaButton />}
    </div>
  );
}
