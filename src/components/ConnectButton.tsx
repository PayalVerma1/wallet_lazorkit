// "use client";

// // ConnectButton
// import { useWallet } from '@lazorkit/wallet';

// export function ConnectButton() {
//   const {
//     connect,
//     disconnect,
//     isConnected,
//     isConnecting,
//     smartWalletPubkey
//   } = useWallet();

//   if (isConnected && smartWalletPubkey) {
//     return (
//       <button onClick={disconnect} className="px-6 py-3 rounded-lg
//     border border-orange-400
//     text-orange-400 font-medium
//     transition
//     hover:bg-orange-400 hover:text-black
//     disabled:opacity-40 disabled:cursor-not-allowed
//     disabled:hover:bg-transparent disabled:hover:text-orange-400
//   ">
//         Disconnect ({smartWalletPubkey.toBase58().slice(0, 6)}...)
//       </button>
//     );
//   }

//   return (
//     <div className='flex flex-col items-center justify-center border h-20 w-60 py-2 rounded-md text-orange-100'>
//     <button onClick={() => connect()} disabled={isConnecting} className='border px-6 h-20 w-60 py-2 rounded-md bg-black text-orange-500'>
//       {isConnecting ? 'Connecting...' : 'Connect with Passkey'}
//     </button>
//     </div>
//   );
// }
"use client";

import { useWallet } from "@lazorkit/wallet";

export function ConnectButton() {
  const { connect, disconnect, isConnected, isConnecting, smartWalletPubkey } =
    useWallet();

  if (isConnected && smartWalletPubkey) {
    return <button onClick={disconnect}>Disconnect</button>;
  }

  return (
    <button onClick={() => connect()} disabled={isConnecting}>
      {isConnecting ? "Connecting..." : "Connect with Passkey"}
    </button>
  );
}
