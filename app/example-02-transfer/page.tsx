"use client";

import { ConnectButton } from "@/src/components/CreateWallet";
import { TransferButton } from "@/src/components/TransferButton";
import { useWallet } from "@lazorkit/wallet";

export default function TransferExample() {
  const { isConnected, smartWalletPubkey } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Example 01: Gasless SOL Transfer</h1>

      {!isConnected && <ConnectButton />}

      {isConnected && smartWalletPubkey && (
        <>
          <p className="text-sm">
            Smart Wallet: {smartWalletPubkey.toBase58()}
          </p>
          <TransferButton />
        </>
      )}
    </div>
  );
}
