
# Example 04: Subscription Service with Automated USDC Billing

**Recurring payments on Solana powered by passkeys and smart wallets**

This example demonstrates how to build a **subscription-style billing system** on Solana using **Lazorkit smart wallets** and **USDC**, without requiring users to install a wallet, manage seed phrases, or hold SOL for gas.

Unlike one-time payments, this example introduces **recurring billing logic**, showing how developers can model SaaS-style subscriptions on top of Solana.

---

## What this example demonstrates

* Passkey-based wallet authorization
* Gasless USDC payments using Lazorkit paymaster
* Subscription authorization flow (user-approved)
* Server-side recurring billing logic
* Separation of **authorization** and **charging**
* Web2-style subscription UX on Solana

---

## Subscription model (important)

This example follows a **two-phase subscription pattern**, commonly used in real products:

### 1️⃣ Authorization (client-side)

The user explicitly authorizes a subscription by signing an on-chain USDC payment.

### 2️⃣ Charging (server-side)

A backend job periodically charges active subscriptions using stored metadata.

> ⚠️ This example demonstrates **architecture and flow**, not a custodial system.
> It intentionally avoids storing private keys or signing on behalf of users.

---

## User flow

1. User opens the app
2. User connects using passkey authentication
3. Lazorkit smart wallet is created or restored
4. User clicks **Authorize Subscription**
5. Initial USDC payment is signed with Face ID / Touch ID
6. Subscription metadata is saved on the backend
7. Backend periodically checks for due subscriptions
8. Due subscriptions are charged using Lazorkit smart wallet logic
9. Gas fees are sponsored by Lazorkit paymaster

---

## Minimal Subscription Authorization Code (Client)

This is the **entire client-side logic** required to authorize a USDC subscription.

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

const MERCHANT = new PublicKey("MERCHANT_WALLET_ADDRESS");

export function SubscribeButton() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();

  const subscribe = async () => {
    if (!smartWalletPubkey) return;

    const userATA = await getAssociatedTokenAddress(
      USDC_MINT,
      smartWalletPubkey,
      true
    );

    const merchantATA = await getAssociatedTokenAddress(
      USDC_MINT,
      MERCHANT
    );

    const instruction = createTransferInstruction(
      userATA,
      merchantATA,
      smartWalletPubkey,
      1_000_000 // 1 USDC (6 decimals)
    );

    await signAndSendTransaction({
      instructions: [instruction],
      transactionOptions: {
        feeToken: "USDC",
      },
    });

    await fetch("/api/subscription/create", {
      method: "POST",
      body: JSON.stringify({
        smartWallet: smartWalletPubkey.toBase58(),
      }),
    });

    alert("Subscription activated!");
  };

  return <button onClick={subscribe}>Authorize $1/month</button>;
}
```

---

## Backend Charging Logic (Conceptual)

The backend periodically processes subscriptions:

* Reads active subscriptions
* Checks if billing date is due
* Constructs USDC transfer instructions
* Executes charges using Lazorkit smart wallet APIs

```ts
export async function chargeSubscriptions(lazorkitClient) {
  for (const sub of subscriptions) {
    if (!sub.active) continue;
    if (Date.now() < sub.nextChargeAt) continue;

    // Construct USDC transfer instruction
    // Call lazorkitClient.signAndSendTransaction(...)
    // Advance billing cycle on success
  }
}
```

> In this example, backend signing is **stubbed for safety**.
> Real production systems must use secure server-side authorization flows.

---

## Key files in this example

| File                               | Purpose                       |
| ---------------------------------- | ----------------------------- |
| `Subscription.tsx`                 | Subscription authorization UI |
| `api/subscription/create/route.ts` | Store subscription metadata   |
| `cron/subscription.ts`             | Periodic billing logic        |
| `api/subscription/charge/route.ts` | Trigger billing job           |
| `ExampleLayout.tsx`                | Shared tutorial layout        |

---

## Why this example matters

This example shows how Solana can support:

* SaaS subscriptions
* Membership billing
* Creator subscriptions
* In-app recurring payments

—all **without wallet extensions**, **without gas friction**, and **without exposing blockchain complexity to users**.

It demonstrates how Lazorkit enables **Web2-grade UX on Web3 infrastructure**.

---

## How this maps to the bounty

This example fulfills:

> **“Subscription service with automated USDC billing on Solana (powered by smart wallet)”**

✔ Passkey login
✔ Gasless USDC transactions
✔ Real on-chain transfers
✔ Backend billing architecture
✔ Clear developer tutorial

---

## Live Demo

Try this example live:

**[https://wallet-lazorkit.vercel.app/example-04-subscription](https://wallet-lazorkit.vercel.app/example-05-subscription)**

---

## Testing on Devnet

1. Create a wallet using Face ID / Touch ID
2. Fund wallet with devnet SOL (for account creation)
3. Fund wallet with devnet USDC (Circle faucet)
4. Authorize a subscription
5. Trigger backend billing manually or via cron

---

## Resources

* Lazorkit Docs — [https://docs.lazorkit.com](https://docs.lazorkit.com)
* SPL Token Program — [https://spl.solana.com/token](https://spl.solana.com/token)
* Solana Developer Docs — [https://solana.com/developers](https://solana.com/developers)

---

## Final takeaway

> **Subscriptions on Solana don’t need wallets, gas, or seed phrases.
> With Lazorkit, recurring payments feel just like Web2 — but settle on-chain.**

---

