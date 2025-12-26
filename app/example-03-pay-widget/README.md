
# Example 03: “Pay with Solana” Widget

**A Web2-style checkout experience powered by passkeys and smart wallets**

This example demonstrates how to build a **reusable “Pay with Solana” widget** using **Lazorkit passkey wallets**.
Users can complete payments **without installing a wallet**, **without seed phrases**, and **without holding SOL for gas**.

This example builds on the **gasless USDC transfer** pattern introduced in **Example 02**.

---

## What this example demonstrates

* Embedding Solana payments directly into a frontend
* Reusable checkout-style **Pay with Solana** button
* **Gasless USDC payments** via Lazorkit paymaster
* Passkey-based transaction signing
* Web2-like UX on top of real Solana transactions

---

## User flow

1. User opens the app
2. User connects using passkey authentication
3. Smart wallet is restored or created
4. User clicks **Pay with Solana**
5. Payment instruction is constructed
6. Transaction is signed using Face ID / Touch ID
7. Lazorkit paymaster sponsors the gas
8. Payment settles on Solana

---

## What makes this a “widget”

Unlike Example 02 (raw transfer), this example abstracts payments into a **single reusable component**:

* No transaction logic exposed to the page
* No blockchain concepts shown to users
* Can be dropped into any product UI

This pattern mirrors real-world checkout buttons such as **“Pay with Card”** or **“Pay with Apple Pay”**.

---

## Minimal Payment Code (Copy-Paste)

This is the **entire payment logic** required for a gasless USDC checkout.

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

export function PayWithSolanaButton() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();

  const handlePay = async () => {
    if (!smartWalletPubkey) return;

    const merchant = new PublicKey("MERCHANT_WALLET_ADDRESS");

    const userATA = await getAssociatedTokenAddress(
      USDC_MINT,
      smartWalletPubkey,
      true
    );

    const merchantATA = await getAssociatedTokenAddress(
      USDC_MINT,
      merchant
    );

    const instruction = createTransferInstruction(
      userATA,
      merchantATA,
      smartWalletPubkey,
      99_000_000 // 99 USDC (6 decimals)
    );

    await signAndSendTransaction({
      instructions: [instruction],
      transactionOptions: {
        feeToken: "USDC",
      },
    });

    alert("Payment successful!");
  };

  return <button onClick={handlePay}>Pay with Solana</button>;
}
```

---

## Key files in this example

| File                      | Purpose                       |
| ------------------------- | ----------------------------- |
| `PayWithSolanaButton.tsx` | Reusable payment component    |
| `ExampleLayout.tsx`       | Shared tutorial layout        |
| `ConnectButton.tsx`       | Passkey wallet connection     |
| `WalletInfo.tsx`          | Displays smart wallet address |

---

## Why this example matters

This example shows how Solana payments can:

* Feel instant and familiar
* Avoid wallet extensions entirely
* Remove gas-fee friction
* Integrate cleanly into real products

It demonstrates how Lazorkit enables **production-grade UX**, not just demos.

---

## How this maps to the bounty

This example fulfills:

> **“Pay with Solana” widget**

* Original product-style abstraction
* Real on-chain USDC transfer
* Gasless execution
* Passkey-secured signing

---

## Next steps

You now have all building blocks to create:

* Subscriptions
* One-click checkouts
* In-app purchases
* SaaS billing flows

These patterns can be extended to **Mainnet** with minimal changes.

---

## Live Demo

Try this example live:

**[https://wallet-lazorkit.vercel.app/example-03-pay-widget](https://wallet-lazorkit.vercel.app/example-03-pay-widget)**

---
## Testing on Devnet:

1. Create a wallet using Face ID/Touch ID
2. Get devnet SOL from **Solana Faucet**
3. Get devnet USDC from **Circle Faucet**
4. Try the gasless transfer and subscription features

---

## Resources

* **Lazorkit Docs:** [https://docs.lazorkit.com](https://docs.lazorkit.com)
* **SPL Token Program:** [https://spl.solana.com/token](https://spl.solana.com/token)
* **Solana UX Best Practices:** [https://solana.com/developers](https://solana.com/developers)

---
