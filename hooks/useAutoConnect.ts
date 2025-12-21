"use client";

import { useWallet } from "@lazorkit/wallet";
import { useEffect } from "react";

export function useAutoConnect() {
  const { connect, isConnected } = useWallet();

  useEffect(() => {
    if (!isConnected) connect();
  }, [connect, isConnected]);
}
