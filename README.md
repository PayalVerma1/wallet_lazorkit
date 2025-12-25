# Lazorkit Starter Examples 🚀

This repository contains **practical, beginner-friendly examples** demonstrating how to integrate the **Lazorkit SDK** into a modern web application.

The goal of this repo is to help Solana developers get started with **passkey-based smart wallets** and **gasless transactions**, without requiring users to install browser wallets or manage seed phrases.

This project was built as part of the **Superteam × Lazorkit bounty** and is intended to serve as a **starter template / learning resource**, not a full production product.

---

## 🌟 Why Lazorkit?

In 2025, most blockchain applications still require:

- Installing third-party wallet extensions
- Managing seed phrases
- Understanding gas fees

Lazorkit changes this by enabling:

- **Passkey-based authentication**
- **Smart wallets on Solana**
- **Gasless transactions via paymasters**

This allows Web3 applications to deliver a **Web2-like user experience** while remaining **non-custodial and on-chain**.

---

## 📦 What this repository demonstrates

This repo contains **three independent examples**, each focusing on a specific Lazorkit use case.

Each example is isolated, well-documented, and designed to be easy to understand and reuse.

---

## 🧩 Examples Overview

### 🔹 Example 01: Passkey Login Flow with Smart Wallet

📁 `app/example-01-login`

Demonstrates:

- Passkey-based authentication using Lazorkit
- Automatic creation/restoration of a smart wallet
- Wallet session persistence
- Client-side disconnect handling

This example focuses purely on **authentication and wallet creation**.

➡️ Maps directly to the bounty use case:

> _Passkey login flow with smart wallet_

---

### 🔹 Example 02: Gasless SOL Transfer

📁 `app/example-02-transfer`

Demonstrates:

- Interaction with an existing Solana protocol
- Native SOL transfer using `SystemProgram.transfer`
- Gasless transactions using Lazorkit paymaster
- Transaction signing via smart wallet

➡️ Satisfies the bounty requirement:

> _One example must interact with an existing protocol on Solana_

---

### 🔹 Example 03: “Pay with Solana” Widget

📁 `app/example-03-pay-widget`

Demonstrates:

- Product-style payment abstraction
- Reusable “Pay with Solana” button
- Gasless checkout-like UX
- Smart wallet–powered payments

This example focuses on **UX abstraction**, showing how blockchain payments can feel like traditional Web2 checkouts.

➡️ Maps to the bounty use case:

> _“Pay with Solana” widget_

---

## 🏗️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Blockchain:** Solana (Devnet)
- **SDK:** Lazorkit
- **Wallet Model:** Passkey-based smart wallet
- **Transactions:** Gasless via paymaster

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## 🌐 Live Demo

A deployed Devnet demo is available here:

🔗 **[https://wallet-lazorkit.vercel.app/](https://wallet-lazorkit.vercel.app/)**

---

## 🧠 How to use this repo

This repository is designed to be:

- Read top-to-bottom
- Explored example-by-example
- Used as a starter template for new projects

Recommended learning path:

1. Start with **Example 01** (authentication)
2. Move to **Example 02** (transactions)
3. Finish with **Example 03** (product abstraction)

---

## 🔐 Custody & Security Notes

- Users never handle seed phrases
- No private keys are exposed
- Authentication is handled via passkeys (WebAuthn)
- Smart wallets are real Solana accounts
- Transactions remain fully on-chain

---

## 🎯 Bounty Alignment

This submission fulfills all required deliverables:

- ✅ Working example repository
- ✅ Passkey authentication with smart wallet
- ✅ Gasless transaction example
- ✅ Interaction with an existing Solana protocol
- ✅ Original product-style example
- ✅ Clear structure and documentation
- ✅ Live Devnet deployment

---

## 📚 Further Reading

- Lazorkit Docs: [https://docs.lazorkit.com](https://docs.lazorkit.com)
- Lazorkit GitHub: [https://github.com/lazor-kit/lazor-kit](https://github.com/lazor-kit/lazor-kit)
- Solana Docs: [https://docs.solana.com](https://docs.solana.com)

---

## 🙌 Final Notes

This project is intentionally kept **simple and educational**.

The focus is on:

- Correct Lazorkit integration
- Clear learning outcomes
- Developer experience

Feel free to fork, extend, or adapt these examples for your own projects.
