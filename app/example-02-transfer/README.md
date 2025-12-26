## Example 02: **Gasless USDC Transfer on Solana**

This example demonstrates how to transfer **USDC (SPL token)** on Solana using a **passkey-based smart wallet**, without requiring the user to hold **SOL** for gas fees.

Transaction fees are sponsored via the **Lazorkit paymaster**, making the transfer **gasless** from the user’s perspective.

This example builds on the **passkey login flow** from Example 01.

---

## What this example demonstrates

* **USDC token transfer** on Solana
* Interaction with the **SPL Token Program**
* **Gasless transactions** using Lazorkit paymaster
* Transaction signing via **passkey-authenticated smart wallet**
* Web2-style user experience for on-chain payments

---

## Solana protocol used

This example interacts with the **SPL Token Program**, which is the standard Solana protocol used for transferring fungible tokens such as **USDC**.

This satisfies the bounty requirement:

> **One example must interact with an existing protocol on Solana**

---

## User flow

1. User logs in using **passkey authentication**
2. User clicks **Send 1 USDC (Gasless)**
3. The app creates an **SPL token transfer instruction**
4. Lazorkit signs the transaction using the **smart wallet**
5. Gas fees are sponsored by the **paymaster**
6. **USDC is transferred on-chain**

---

## Why this transfer is gasless

On Solana, users normally need **SOL** to pay transaction fees.

With **Lazorkit**:

* Transaction fees are paid by a **paymaster**
* Users do **not** need SOL
* Only a **USDC balance** is required

This removes gas friction while keeping transactions **non-custodial**.

---

## Why this example matters

This example shows how developers can:

* Transfer **real tokens (USDC)** instead of SOL
* Remove gas complexity from user onboarding
* Build **payment and checkout flows**
* Keep transactions **fully on-chain**

This demonstrates Lazorkit’s core value:

**Abstracting blockchain friction while preserving security**

---

## Key files

* **TransferButton.tsx**
  Creates and sends the **USDC transfer instruction**

* Uses:

  * **@solana/spl-token** (SPL Token Program)
  * Lazorkit **signAndSendTransaction**
  * Paymaster via **feeToken: "USDC"**

---

## Notes

* Sender must already hold **USDC**
* Recipient must have an **associated USDC token account**
* Works on **Devnet and Mainnet** (RPC and paymaster config change only)

---