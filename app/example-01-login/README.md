# Example 01: Passkey Login Flow with Smart Wallet

**Implement passkey-based authentication on Solana using Lazorkit — no seed phrases, no browser wallets**

This example demonstrates the **core Lazorkit integration**:
creating and managing a **Solana smart wallet** using **passkey authentication (WebAuthn)**.

This example is the **foundation** for all other examples in this repository.

---

## What this example demonstrates

* **Passkey-based authentication** using WebAuthn
* **Automatic smart wallet creation** on Solana
* **Session-based wallet management**
* **Client-side connect & disconnect**
* **No browser wallet extensions**
* **No seed phrases exposed**

---

## User flow

1. User opens the application
2. User clicks **Connect with Passkey**
3. Browser prompts Face ID / Touch ID / device authentication
4. Lazorkit creates or restores a smart wallet
5. Smart wallet address is returned to the app
6. User can disconnect at any time

---

## What is a smart wallet?

In Lazorkit, a **smart wallet** is a real Solana account controlled through **passkey-based authorization** instead of a user-managed private key.

**Key properties:**

* No seed phrase shown to the user
* Private keys never leave the device
* Authentication via WebAuthn (Face ID / Touch ID)
* Fully compatible with Solana programs
* Can later perform **gasless transactions**

This wallet can hold **SOL**, **USDC**, and interact with **any Solana protocol**.

---

## Prerequisites

Before running this example, ensure you have:

```bash
npm install @lazorkit/wallet @solana/web3.js
```

---

## Lazorkit Provider Setup

Your app must be wrapped with the Lazorkit provider.

```ts
// src/providers/LazorkitProvider.tsx
"use client";

import { LazorkitProvider } from "@lazorkit/wallet";

export function LazorkitAppProvider({ children }) {
  return (
    <LazorkitProvider
      rpcUrl="https://api.devnet.solana.com"
      portalUrl="https://portal.lazor.sh"
      paymasterConfig={{
        paymasterUrl: "https://kora.devnet.lazorkit.com",
      }}
    >
      {children}
    </LazorkitProvider>
  );
}
```

And mount it in your root layout:

```ts
// app/layout.tsx
import { LazorkitAppProvider } from "@/src/providers/LazorkitProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LazorkitAppProvider>{children}</LazorkitAppProvider>
      </body>
    </html>
  );
}
```

---

## Core Lazorkit Hook

Lazorkit exposes everything through a **single hook**:

```ts
import { useWallet } from "@lazorkit/wallet";
```

This hook provides:

* `connect()`
* `disconnect()`
* `isConnected`
* `isConnecting`
* `smartWalletPubkey`
* `signAndSendTransaction()`

---

## Minimal Passkey Login Code (Copy-Paste)

This is the **exact minimal code** required to implement passkey login.

```ts
import { useWallet } from "@lazorkit/wallet";

export function ConnectButton() {
  const {
    connect,
    disconnect,
    isConnected,
    isConnecting,
    smartWalletPubkey,
  } = useWallet();

  if (isConnected && smartWalletPubkey) {
    return (
      <button onClick={disconnect}>
        Disconnect ({smartWalletPubkey.toBase58().slice(0, 6)}...)
      </button>
    );
  }

  return (
    <button onClick={() => connect()} disabled={isConnecting}>
      {isConnecting ? "Connecting..." : "Connect with Passkey"}
    </button>
  );
}
```

---

## Accessing the Smart Wallet Address

Once connected, Lazorkit exposes the wallet address:

```ts
import { useWallet } from "@lazorkit/wallet";

export function WalletInfo() {
  const { smartWalletPubkey, isConnected } = useWallet();

  if (!isConnected || !smartWalletPubkey) return null;

  return (
    <p>
      Smart Wallet Address:
      <br />
      {smartWalletPubkey.toBase58()}
    </p>
  );
}
```

This address is a **real Solana public key** and can be used in:

* Transfers
* Token accounts
* Program interactions

---

## Disconnecting the Wallet

Disconnecting is handled entirely **client-side**:

```ts
<button onClick={disconnect}>Disconnect</button>
```

No interaction with the Lazorkit portal is required.

---

## Key Files in This Example

| File                             | Purpose                              |
| -------------------------------- | ------------------------------------ |
| `ConnectButton.tsx`              | Handles passkey connect & disconnect |
| `WalletInfo.tsx`                 | Displays smart wallet address        |
| `ExampleLayout.tsx`              | Shared tutorial layout               |
| `providers/LazorkitProvider.tsx` | Lazorkit SDK initialization          |

---

## Why this example matters

This example proves that:

* Web3 login can feel like **Web2 authentication**
* Users don’t need to understand wallets or keys
* Developers can onboard users instantly
* Security remains **non-custodial and on-chain**

It directly satisfies the bounty requirement:

> **Passkey login flow with smart wallet**

---

## Common issues

| Issue            | Fix                                  |
| ---------------- | ------------------------------------ |
| Popup blocked    | Allow popups for the site            |
| Login stuck      | Ensure HTTPS (required for WebAuthn) |
| Wallet not shown | Check provider is mounted            |
| Localhost issues | Use deployed HTTPS URL               |

---

## Next steps

Once a smart wallet exists, it can sign transactions.

Continue with:

* **Example 02: Gasless USDC Transfer**
  Learn how to send tokens without users holding SOL.

---

## Live Demo

Try this example live:

**[https://wallet-lazorkit.vercel.app/example-01-login](https://wallet-lazorkit.vercel.app/example-01-login)**

---
## Testing on Devnet:

1. Create a wallet using Face ID/Touch ID
2. Get devnet SOL from **Solana Faucet**
3. Get devnet USDC from **Circle Faucet**
4. Try the gasless transfer and subscription features

---

## Resources

* **Lazorkit Docs:** [https://docs.lazorkit.com](https://docs.lazorkit.com)
* **Solana Web3.js:** [https://solana-labs.github.io/solana-web3.js](https://solana-labs.github.io/solana-web3.js)
* **WebAuthn Guide:** [https://webauthn.guide](https://webauthn.guide)

---
