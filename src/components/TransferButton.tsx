"use client";

// TransferButton.tsx
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export function TransferButton() {
  const { signAndSendTransaction, smartWalletPubkey, isConnected } = useWallet();

  const handleTransfer = async () => {
    if (!smartWalletPubkey) return;

    try {
      // Use integer math
      const lamports = Math.floor(0.1 * LAMPORTS_PER_SOL);

      const destination = new PublicKey(
        'EEE2dZ4EHFHmgG24zKgVUutCXQqtYTLJCEAWoNcNAXTj' // devnet address
      );

      // Create instruction
      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: destination,
        lamports
      });

      // Sign & send (gasless)
      const signature = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: 'USDC' // Pay in USDC
        }
      });

      console.log('Transaction confirmed:', signature);
      alert(`Tx sent!\n${signature}`);
      
    } catch (err) {
      console.error('Transfer failed:', err);
      alert('Transfer failed. Check console.');
    }
  };

  return (
    <button onClick={handleTransfer} disabled={!isConnected}>
      Send 0.1 SOL (Gasless)
    </button>
  );
}
