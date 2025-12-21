"use client";

// ConnectButton.tsx
import { useWallet } from '@lazorkit/wallet';

export function ConnectButton() {
  const {
    connect,
    disconnect,
    isConnected,
    isConnecting,
    smartWalletPubkey
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
      {isConnecting ? 'Connecting...' : 'Connect with Passkey'}
    </button>
  );
}
