"use client";

import { ConnectButton } from '../src/components/CreateWallet';
import { TransferButton } from '../src/components/TransferButton';
import { useWallet } from '@lazorkit/wallet';

export function MainContent() {
  const { isConnected, smartWalletPubkey } = useWallet();

  return (
    <div style={{ padding: 32 }}>
      <h1>Lazorkit Solana Demo</h1>

      <ConnectButton />

      {isConnected && smartWalletPubkey && (
        <>
          <p>
            Smart Wallet:
            <br />
            <code>{smartWalletPubkey.toBase58()}</code>
          </p>

          <TransferButton />
        </>
      )}
    </div>
  );
}

// Next expects a default export for a page
export default MainContent;
