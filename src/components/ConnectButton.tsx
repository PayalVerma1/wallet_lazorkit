"use client";

// ConnectButton
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
    <div className='flex flex-col items-center justify-center border h-20 w-60 py-2 rounded-md '>
    <button onClick={() => connect()} disabled={isConnecting} className='border px-6 h-20 w-60 py-2 rounded-md bg-black'>
      {isConnecting ? 'Connecting...' : 'Connect with Passkey'}
    </button>
    </div>
  );
}
