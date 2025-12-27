# Example 02: Gasless USDC Transfer on Solana

**Send USDC on Solana without users holding SOL — powered by Lazorkit smart wallets**

This example demonstrates how to perform a **gasless USDC transfer** on Solana using a **passkey-based smart wallet** and Lazorkit’s **paymaster**.

It builds directly on **Example 01**, where the smart wallet is created using passkey authentication.

---

## What this example demonstrates

* **USDC transfer** using the SPL Token Program
* **Gasless transactions** via Lazorkit paymaster
* **Transaction signing with passkeys (WebAuthn)**
* Interaction with a **real Solana protocol (SPL Token)**
* No SOL balance required by the user

---

## Solana protocol used

This example interacts with the **SPL Token Program**, the standard Solana protocol for fungible tokens like **USDC**.

This satisfies the bounty requirement:

> **One example must interact with an existing protocol on Solana**

---

## User flow

1. User connects using passkey (Example 01)
2. Smart wallet is restored or created
3. User clicks **Send USDC (Gasless)**
4. Associated Token Accounts (ATAs) are resolved
5. Missing recipient ATA is created automatically (if needed)
6. USDC transfer instruction is created
7. Transaction is signed using Face ID / Touch ID
8. Lazorkit paymaster covers the gas fee
9. Transaction is submitted on-chain

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

## Minimal Gasless USDC Transfer Code (Safe Version)

This is the **recommended minimal implementation**, including **automatic ATA creation** to prevent transaction failures.

```ts
import { useWallet } from "@lazorkit/wallet";
import { PublicKey, Connection } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from "@solana/spl-token";

const USDC_MINT = new PublicKey(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU" // Devnet USDC
);

const RECIPIENT = new PublicKey("RECEIVER_WALLET_ADDRESS");

export function TransferButton() {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();

  const handleTransfer = async () => {
    if (!smartWalletPubkey) return;

    const amount = 1_000_000; // 1 USDC (6 decimals)
    const instructions = [];

    const fromATA = await getAssociatedTokenAddress(
      USDC_MINT,
      smartWalletPubkey
    );

    const toATA = await getAssociatedTokenAddress(
      USDC_MINT,
      RECIPIENT
    );

    // Check if recipient ATA exists
    const connection = new Connection("https://api.devnet.solana.com");
    const toAccountInfo = await connection.getAccountInfo(toATA);

    if (!toAccountInfo) {
      instructions.push(
        createAssociatedTokenAccountInstruction(
          smartWalletPubkey, // payer (paymaster sponsors)
          toATA,
          RECIPIENT,
          USDC_MINT
        )
      );
    }

    instructions.push(
      createTransferInstruction(
        fromATA,
        toATA,
        smartWalletPubkey,
        amount
      )
    );

    await signAndSendTransaction({
      instructions,
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

## Why ATA handling matters

On Solana:

* Token transfers **require associated token accounts (ATAs)**
* ATAs are **not created automatically**
* Attempting to transfer to a missing ATA causes:

  ```
  InstructionError: InvalidAccountData
  ```

This example **safely checks and creates** the recipient ATA before transferring.

---

## Key files in this example

| File                 | Purpose                                |
| -------------------- | -------------------------------------- |
| `TransferButton.tsx` | Builds and sends gasless USDC transfer |
| `ExampleLayout.tsx`  | Shared tutorial layout                 |
| `ConnectButton.tsx`  | Passkey wallet connection              |
| `WalletInfo.tsx`     | Displays smart wallet address          |

---

## Why this example matters

This example shows how developers can:

* Remove **gas fees** from token transfers
* Build payment flows without wallet extensions
* Use **real Solana protocols safely**
* Improve onboarding and retention

It highlights a core Lazorkit value:

> **Abstracting blockchain complexity without sacrificing decentralization**

---

## Common issues & solutions

| Issue                    | Explanation                                             |
| ------------------------ | ------------------------------------------------------- |
| `InvalidAccountData`     | Recipient ATA does not exist — ensure ATA creation      |
| `Account already in use` | ATA was created twice — check existence before creating |
| No USDC balance          | Sender ATA exists but has 0 balance                     |
| Wrong USDC mint          | Use **Devnet USDC mint** on Devnet                      |
| Popup blocked            | Allow popups for Lazorkit portal                        |

---

## Testing on Devnet

1. Create a wallet using Face ID / Touch ID
2. Get devnet SOL from **Solana Faucet**
3. Get devnet USDC from **Circle Faucet**
4. Try the gasless USDC transfer

---

## Next steps

Continue with:

**Example 03: Pay with Solana Widget**
A product-style checkout abstraction built on top of gasless USDC transfers.

---

## Resources

* **Lazorkit Docs:** [https://docs.lazorkit.com](https://docs.lazorkit.com)
* **SPL Token Docs:** [https://spl.solana.com/token](https://spl.solana.com/token)
* **Solana Web3.js:** [https://solana-labs.github.io/solana-web3.js](https://solana-labs.github.io/solana-web3.js)

