"use client";

import { ConnectButton } from '../src/components/CreateWallet';
import { TransferButton } from '../src/components/TransferButton';
import { useWallet } from '@lazorkit/wallet';

export function MainContent() {
  const { isConnected, smartWalletPubkey } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 border">
      <h1 className="text-4xl mb-4 font-bold p-4 mask-radial-from-neutral-900">Lazorkit Solana Demo</h1>
      <div className='mb-4'> <ConnectButton /></div>
     

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
