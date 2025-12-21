"use client";

import React from "react";
import { LazorkitProvider } from "@lazorkit/wallet";

// Expose a client-side provider component for use in app/layout.tsx
export function LazorkitAppProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LazorkitProvider
      rpcUrl="https://api.devnet.solana.com"
      portalUrl="https://portal.lazor.sh"
      paymasterConfig={{ paymasterUrl: "https://kora.devnet.lazorkit.com" }}
    >
      {children}
    </LazorkitProvider>
  );
}

export default LazorkitAppProvider;
