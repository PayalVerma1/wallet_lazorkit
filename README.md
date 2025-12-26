## Lazorkit Starter Examples

This repository contains **practical, beginner-friendly examples** showing how to integrate the **Lazorkit SDK** into a modern web application.

The goal of this project is to help Solana developers understand how to build applications using **passkey-based smart wallets** and **gasless transactions**, without requiring users to install browser wallets or manage seed phrases.

This project was built as part of the **Superteam × Lazorkit bounty** and is intended to serve as a **starter template and learning resource**, not a full production product.

---

## What is Lazorkit

**Lazorkit** is a Solana SDK that enables applications to authenticate users using **passkeys (WebAuthn)** instead of traditional wallet extensions and seed phrases.

With Lazorkit, applications can:

* Create and manage **smart wallets** for users
* Authenticate users with **Face ID / Touch ID**
* Execute **gasless transactions** using paymasters
* Abstract blockchain complexity while remaining **non-custodial**

This allows developers to build **Web2-like user experiences** on Solana while keeping transactions fully on-chain.

---

## Why this project exists

Traditional Solana applications often require:

* Browser wallet installation
* Seed phrase management
* SOL balance for gas fees
* Complex onboarding flows

This repository demonstrates how Lazorkit removes those barriers by:

* Replacing seed phrases with **passkeys**
* Creating **smart wallets automatically**
* Sponsoring gas fees via **paymasters**
* Allowing users to transact without holding SOL

The focus of this repo is **clarity**, **correctness**, and **real integration patterns**.

---

## What this repository demonstrates

This repository contains **three independent examples**, each focused on a specific Lazorkit use case.

Each example:

* Is isolated and easy to understand
* Includes a clear UI demonstration
* Includes a copy-paste-ready code snippet
* Maps directly to a bounty requirement

---

## Examples Overview

## Example 01: Passkey Login Flow with Smart Wallet

**Path:** `app/example-01-login`
**Tutorial** `app/example-01-login/README.md`

This example demonstrates:

* Passkey-based authentication using Lazorkit
* Automatic creation of a **smart wallet**
* Session persistence and reconnection
* Client-side wallet disconnect handling

This example focuses purely on **authentication and wallet creation**, without transactions.

**Bounty mapping:**
**Passkey login flow with smart wallet**

---

## Example 02: Gasless USDC Transfer on Solana

**Path:** `app/example-02-transfer`
**Tutorial** `app/example-02-transfer/README.md`

This example demonstrates:

* Interaction with an existing Solana protocol
* **USDC (SPL token) transfer**
* Gasless transactions using Lazorkit paymaster
* Transaction signing using a passkey-based smart wallet

The transfer uses the **SPL Token Program**, which is the standard Solana protocol for fungible tokens.

**Bounty mapping:**
**One example must interact with an existing protocol on Solana**

---

## Example 03: Pay with Solana Widget

**Path:** `app/example-03-pay-widget`
**Tutorial** `app/example-03-pay-widget/README.md`

This example demonstrates:

* A product-style payment abstraction
* A reusable **“Pay with Solana”** button
* Gasless checkout-style UX
* Smart wallet–powered payments

This example focuses on **UX abstraction**, showing how blockchain payments can feel like traditional Web2 checkouts.

**Bounty mapping:**
**“Pay with Solana” widget**

---

## Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Blockchain:** Solana (Devnet)
* **Wallet SDK:** Lazorkit
* **Authentication:** WebAuthn (Passkeys)
* **Transactions:** Gasless via paymaster
* **Token Standard:** SPL Token (USDC)

---

## Project Structure

```
.
├── app/
│   ├── example-01-login/        # Passkey login + smart wallet creation
│   ├── example-02-transfer/     # Gasless USDC transfer example
│   ├── example-03-pay-widget/   # “Pay with Solana” widget
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx               # Root layout (providers + global styles)
│   └── page.tsx                 # Homepage with example navigation
│
├── hooks/
│   └── useAutoConnect.ts        # Auto-connect wallet on page load
│
├── public/                      # Static assets
│
├── src/
│   ├── components/
│   │   ├── CodeBlock.tsx        # Copy-pasteable code snippet component
│   │   ├── ConnectButton.tsx    # Passkey connect / disconnect button
│   │   ├── ExampleLayout.tsx    # Shared layout for all examples
│   │   ├── PayWithSolanaButton.tsx  # Payment widget button
│   │   ├── TransferButton.tsx   # Gasless USDC transfer logic
│   │   └── WalletInfo.tsx       # Displays smart wallet address   
│   │
│   └── providers/
│       └── LazorkitProvider.tsx # Lazorkit SDK initialization
│
├── .env                         # Environment configuration
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── postcss.config.mjs
└── README.md

```

---

## Getting Started

## Install dependencies

```bash
npm install
```

## Run the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## Environment Configuration

This project uses public configuration values for Solana and Lazorkit.

Example values used in the repo:

* **Solana RPC:** Devnet
* **Lazorkit Portal URL**
* **Lazorkit Paymaster URL**
```
# Solana Network
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# LazorKit Configuration
NEXT_PUBLIC_LAZORKIT_PORTAL_URL=https://portal.lazor.sh
NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL=https://kora.devnet.lazorkit.com

# Token Configuration (Devnet USDC)
NEXT_PUBLIC_USDC_MINT=4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU

```
If you want to adapt this repo to Mainnet, only these configuration values need to change.

---

## Live Demo

A deployed Devnet demo is available here:

**[https://wallet-lazorkit.vercel.app/](https://wallet-lazorkit.vercel.app/)**

## Testing on Devnet:

1. Create a wallet using Face ID/Touch ID
2. Get devnet SOL from **Solana Faucet**
3. Get devnet USDC from **Circle Faucet**
4. Try the gasless transfer and subscription features

---

## How to use this repository

This repository is designed to be explored **example by example**.

Recommended learning path:

1. Start with **Example 01** to understand authentication
2. Move to **Example 02** to learn gasless transactions
3. Finish with **Example 03** to see product-style abstraction

Each example includes:

* A working UI
* A short explanation of how it works
* A minimal, copy-paste-ready code snippet

---

## Custody and Security Notes

* Users never handle seed phrases
* No private keys are exposed to the application
* Authentication uses standard **WebAuthn passkeys**
* Smart wallets are real Solana accounts
* Transactions are fully on-chain and non-custodial

---

## Bounty Alignment

This submission fulfills all required deliverables:

* **Working example repository**
* **Passkey-based smart wallet integration**
* **Gasless transaction example**
* **Interaction with existing Solana protocol**
* **Original product-style example**
* **Clear structure and documentation**
* **Live Devnet deployment**

---

## Further Reading

* **Lazorkit Documentation:** [https://docs.lazorkit.com](https://docs.lazorkit.com)
* **Lazorkit GitHub:** [https://github.com/lazor-kit/lazor-kit](https://github.com/lazor-kit/lazor-kit)
* **Solana Documentation:** [https://docs.solana.com](https://docs.solana.com)

---

## Final Notes

This project is intentionally kept **simple and educational**.

The focus is on:

* Correct Lazorkit integration
* Clear learning outcomes
* Practical developer experience

Feel free to fork, extend, or adapt these examples for your own Solana projects.

---
