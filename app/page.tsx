"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Lazorkit Integration Examples
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            A practical, developer-focused collection of examples showing how to
            build Solana applications using <span className="text-[#2dd4bf] font-medium">passkeys</span>,
            <span className="text-[#2dd4bf] font-medium"> smart wallets</span>, and
            <span className="text-[#2dd4bf] font-medium"> gasless transactions</span>{" "}
            with Lazorkit — without browser wallets or seed phrases.
          </p>
        </div>

        {/* What is Lazorkit */}
        <div className="border border-white/15 rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-semibold">What is Lazorkit?</h2>
          <p className="text-gray-400">
            Lazorkit is a Solana SDK that enables developers to build Web2-like
            user experiences using <span className="text-[#2dd4bf]">passkey authentication</span>.
            Users can sign in with Face ID / Touch ID and interact with Solana
            through <span className="text-[#2dd4bf]">smart wallets</span>, without
            installing any wallet extensions.
          </p>
        </div>

        {/* Examples */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            Available Examples
          </h2>

          <div className="grid gap-4">
            {/* Example 01 */}
            <Link href="/example-01-login">
              <div className="group border border-white/15 rounded-lg p-5 text-orange-300 cursor-pointer transition hover:border-[#2dd4bf]">
                <h3 className="text-lg font-medium group-hover:text-[#2dd4bf]">
                  Example 01: Passkey Login + Smart Wallet
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Create a Solana smart wallet using passkey authentication
                  (Face ID / Touch ID). No seed phrases. No extensions.
                </p>
              </div>
            </Link>

            {/* Example 02 */}
            <Link href="/example-02-transfer">
              <div className="group border border-white/15 rounded-lg p-5 text-orange-300 cursor-pointer transition hover:border-[#2dd4bf]">
                <h3 className="text-lg font-medium group-hover:text-[#2dd4bf]">
                  Example 02: Gasless USDC Transfer
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Send USDC on Solana using a smart wallet, with transaction fees
                  sponsored by a paymaster. Users do not need SOL.
                </p>
              </div>
            </Link>

            {/* Example 03 */}
            <Link href="/example-03-pay-widget">
              <div className="group border border-white/15 rounded-lg p-5 text-orange-300 cursor-pointer transition hover:border-[#2dd4bf]">
                <h3 className="text-lg font-medium group-hover:text-[#2dd4bf]">
                  Example 03: Pay with Solana Widget
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  A checkout-style payment flow that abstracts blockchain
                  complexity and enables one-click Solana payments.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center text-sm text-gray-500">
          These examples are designed as <strong>starter templates</strong> —
          minimal, production-relevant, and easy to extend.
        </div>
      </div>
    </div>
  );
}
