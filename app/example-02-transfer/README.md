# Example 02: Gasless USDC Transfer on Solana

**Send USDC on Solana without users holding SOL — powered by Lazorkit smart wallets**

This example demonstrates how to perform a **gasless USDC transfer** on Solana using a **passkey-based smart wallet** and Lazorkit’s **paymaster**.

It builds directly on **Example 01**, where the smart wallet is created using passkey authentication.

---

## What this example demonstrates

* **USDC transfer** using the SPL Token program
* **Gasless transactions** via Lazorkit paymaster
* **Transaction signing with passkeys**
* Interaction with a **real Solana protocol**
* No SOL balance required by the user

---

## Solana protocol used

This example interacts with the **SPL Token Program**, which is the standard Solana protocol for fungible tokens like **USDC**.

This satisfies the bounty requirement:

> **One example must interact with an existing protocol on Solana**

---

## User flow

1. User connects using passkey (Example 01)
2. Smart wallet is restored or created
3. User clicks **Send USDC (Gasless)**
4. USDC transfer instruction is created
5. Transaction is signed using Face ID / Touch ID
6. Lazorkit paymaster covers the gas fee
7. Transaction is submitted on-chain

---

## Why this is gasless

Normally, Solana users must:

* Hold SOL to pay transaction fees
* Understand gas mechanics

With Lazorkit:

* **Paymaster sponsors the transaction fee**
* Users can transact using **only USDC**
* UX feels similar to Web2 payments

---

## Minimal USDC Transfer Code (Copy-Paste)

This is the **minimal logic** required to send USDC gaslessly using Lazorkit.

```ts
import { useWallet } from "@lazorkit/wallet";
import { PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
} from "@solana/spl-token";

const USDC_MINT = new PublicKey(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU" // Devnet USDC
);

export function TransferButton() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();

  const handleTransfer = async () => {
    if (!smartWalletPubkey) return;

    const senderATA = await getAssociatedTokenAddress(
      USDC_MINT,
      smartWalletPubkey,
      true
    );

    const receiver = new PublicKey("RECEIVER_WALLET_ADDRESS");

    const receiverATA = await getAssociatedTokenAddress(
      USDC_MINT,
      receiver
    );

    const instruction = createTransferInstruction(
      senderATA,
      receiverATA,
      smartWalletPubkey,
      1_000_000 // 1 USDC (6 decimals)
    );

    await signAndSendTransaction({
      instructions: [instruction],
      transactionOptions: {
        feeToken: "USDC",
      },
    });

    alert("USDC sent successfully!");
  };

  return <button onClick={handleTransfer}>Send USDC (Gasless)</button>;
}
```

---

## Key files in this example

| File                 | Purpose                        |
| -------------------- | ------------------------------ |
| `TransferButton.tsx` | Builds and sends USDC transfer |
| `ExampleLayout.tsx`  | Shared tutorial layout         |
| `ConnectButton.tsx`  | Passkey wallet connection      |
| `WalletInfo.tsx`     | Displays smart wallet address  |

---

## Why this example matters

This example shows how developers can:

* Remove **gas fees** from token transfers
* Build payment flows without wallet extensions
* Use real Solana protocols safely
* Improve onboarding and retention

It highlights a core Lazorkit value:

> **Abstracting blockchain complexity without sacrificing decentralization**

---

## Common issues

| Issue                   | Explanation                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| TokenOwnerOffCurveError | Smart wallets are PDA-like — pass `true` to `getAssociatedTokenAddress` |
| No USDC balance         | Token account is created on first transfer                              |
| Transaction fails       | Ensure Devnet USDC mint is correct                                      |
| Popup blocked           | Allow popups for Lazorkit portal                                        |

---

## Next steps

Now that you understand **gasless token transfers**, explore:

* **Example 03: Pay with Solana Widget**
  A product-style checkout abstraction built on top of gasless USDC transfers.

---

## Live Demo

Try this example live:

**[https://wallet-lazorkit.vercel.app/example-02-transfer](https://wallet-lazorkit.vercel.app/example-02-transfer)**

---
## Testing on Devnet:

1. Create a wallet using Face ID/Touch ID
2. Get devnet SOL from **Solana Faucet**
3. Get devnet USDC from **Circle Faucet**
4. Try the gasless transfer and subscription features

---

## Resources

* **Lazorkit Docs:** [https://docs.lazorkit.com](https://docs.lazorkit.com)
* **SPL Token Docs:** [https://spl.solana.com/token](https://spl.solana.com/token)
* **Solana Web3.js:** [https://solana-labs.github.io/solana-web3.js](https://solana-labs.github.io/solana-web3.js)

---
