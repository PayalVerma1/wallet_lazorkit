# Example 02: Gasless SOL Transfer on Solana

This example demonstrates how to send SOL on Solana using a **smart wallet**
without requiring the user to hold SOL for gas fees.

It builds on the passkey login flow from Example 01.

---

## What this example demonstrates

- Interaction with an existing Solana protocol
- Usage of `SystemProgram.transfer`
- Gasless transactions using Lazorkit paymaster
- Transaction signing via passkey-authenticated smart wallet

---

## Solana protocol used

This example interacts with the **Solana System Program**, which is the core
protocol responsible for native SOL transfers.

This satisfies the bounty requirement:

> **One example must interact with an existing protocol on Solana**

---

## User flow

1. User logs in using passkey (Example 01)
2. User clicks **“Send 0.1 SOL (Gasless)”**
3. Lazorkit signs the transaction using the smart wallet
4. Gas fees are paid via the paymaster
5. Transaction is submitted to Solana Devnet

---

## Why this is gasless

Normally, Solana users must hold SOL to pay transaction fees.

With Lazorkit:
- A paymaster sponsors the transaction fees
- Users can transact without holding SOL
- UX is closer to traditional Web2 payments

---

## Why this example matters

This example shows how developers can:

- Remove gas complexity from user experience
- Interact with real Solana programs
- Keep transactions fully on-chain and non-custodial

It demonstrates a core Lazorkit value proposition:
**abstracting blockchain friction while preserving security**.

---

## Key files

- `TransferButton.tsx` – Creates and sends the SOL transfer instruction
- Uses `@solana/web3.js` System Program
- Uses Lazorkit `signAndSendTransaction`

---

## Next steps

Once developers understand gasless transfers, they can build real products
on top of this pattern.

See **Example 03** for a product-style payment abstraction.
