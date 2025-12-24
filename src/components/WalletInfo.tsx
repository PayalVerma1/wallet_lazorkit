"use client";

import { useWallet } from "@lazorkit/wallet";

export function WalletInfo() {
  const { smartWalletPubkey, isConnected } = useWallet();

  if (!isConnected || !smartWalletPubkey) return null;

  return (
    <p className="text-sm text-gray-600">
      Smart Wallet Address:
      <br />
      {smartWalletPubkey.toBase58()}
    </p>
  );
}

