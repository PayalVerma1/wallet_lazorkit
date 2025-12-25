# Example 01: Passkey Login Flow with Smart Wallet

This example demonstrates how to use **Lazorkit** to implement a passkey-based
authentication flow that creates and manages a **smart wallet on Solana**.

This is the most fundamental Lazorkit integration and serves as the starting
point for all other examples in this repository.

---

## What this example demonstrates

- Passkey-based authentication using WebAuthn
- Automatic creation of a Solana smart wallet
- Wallet session persistence
- Client-side disconnect handling
- No browser wallet extensions required
- No seed phrases exposed to the user

---

## User flow

1. User opens the application
2. User clicks **“Connect with Passkey”**
3. Browser prompts for biometric / device authentication
4. Lazorkit creates or restores a smart wallet
5. Wallet address is displayed
6. User can disconnect the session from the app UI

---

## What is a smart wallet?

In Lazorkit, a smart wallet is a Solana wallet controlled by programmable logic
rather than a user-managed private key.

- The user never handles a seed phrase
- Authentication is handled via passkeys
- Transactions can later be sponsored (gasless)

The wallet is still a **real Solana account** and can hold SOL and tokens.

---

## Why this example matters

This example shows how Web3 onboarding can feel like Web2 login:

- No wallet installation
- No cryptographic concepts exposed to the user
- Secure, non-custodial authentication

It directly maps to the bounty use case:

> **Passkey login flow with smart wallet**

---

## Key files

- `ConnectButton.tsx` – Handles connect and disconnect
- `WalletInfo.tsx` – Displays the smart wallet address
- `providers/lazorkit.tsx` – Lazorkit SDK configuration

---

## Next steps

Once the user is authenticated and a smart wallet is available, the wallet can be
used to sign transactions.  
See **Example 02** for a gasless transaction example.
