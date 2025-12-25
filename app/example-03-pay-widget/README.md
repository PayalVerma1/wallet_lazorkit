# Example 03: “Pay with Solana” Widget

This example demonstrates how to build a reusable **“Pay with Solana”**
payment widget using Lazorkit smart wallets.

Instead of exposing raw blockchain concepts, this example focuses on
**product-style UX**.

---

## What this example demonstrates

- Abstracting blockchain payments into a simple UI component
- Gasless payments using a smart wallet
- Reusable “Pay with Solana” button pattern
- Web2-like checkout experience on Solana

---

## How this differs from a raw transfer

While this example still uses a Solana transfer under the hood, the **UX framing**
is different:

- Users see **“Pay ₹99”**, not “Send SOL”
- No mention of wallets, gas, or blockchain
- The payment feels like a standard checkout action

This abstraction is critical for real-world adoption.

---

## User flow

1. User logs in with passkey
2. User clicks **“Pay ₹99 with Solana”**
3. Transaction is signed by the smart wallet
4. Gas fees are sponsored
5. Payment completes successfully

---

## Why this example matters

Most Web3 apps expose low-level blockchain concepts to users.

This example shows how Lazorkit enables:
- Product-first design
- Developer-friendly payment components
- User-friendly Web3 experiences

It directly maps to the bounty use case:

> **“Pay with Solana” widget**

---

## Key files

- `PayWithSolanaButton.tsx` – Reusable payment component
- Uses same smart wallet and paymaster infrastructure
- Demonstrates how raw transfers can power higher-level products

---

## Real-world use cases

This pattern can be extended to:
- Checkout flows
- Donations
- Subscription payments
- Digital content unlocks
- In-app purchases

---

## Summary

This example demonstrates how Lazorkit enables developers to build
**Web2-like payment experiences on Solana** without compromising on
decentralization or security.
