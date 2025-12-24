"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold">Lazorkit Integration Examples</h1>

      <Link href="/example-01-login">
        <button className="border px-6 py-3 rounded">
          Example 01: Passkey Login + Smart Wallet
        </button>
      </Link>

      <Link href="/example-02-transfer">
        <button className="border px-6 py-3 rounded">
          Example 02: Gasless SOL Transfer
        </button>
      </Link>

      <Link href="/example-03-pay-widget">
        <button className="border px-6 py-3 rounded">
          Example 03: Pay with Solana Widget
        </button>
      </Link>
    </div>
  );
}
