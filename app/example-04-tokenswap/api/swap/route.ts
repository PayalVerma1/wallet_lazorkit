import { NextResponse } from "next/server";

const JUPITER_QUOTE_API = "https://quote-api.jup.ag/v6/quote";
const JUPITER_SWAP_API = "https://quote-api.jup.ag/v6/swap";

export async function POST(req: Request) {
  try {
    const { inMint, outMint, amount, user } = await req.json();

    if (!inMint || !outMint || !amount || !user) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    
    const quoteRes = await fetch(
      `${JUPITER_QUOTE_API}?inputMint=${inMint}&outputMint=${outMint}&amount=${amount}&slippageBps=50`
    );

    if (!quoteRes.ok) {
      throw new Error("Failed to fetch Jupiter quote");
    }

    const quote = await quoteRes.json();

    const swapRes = await fetch(JUPITER_SWAP_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteResponse: quote,
        userPublicKey: user,
        wrapAndUnwrapSol: true,
      }),
    });

    if (!swapRes.ok) {
      throw new Error("Failed to fetch Jupiter swap");
    }

    const swap = await swapRes.json();

    return NextResponse.json({
      instructions: swap.swapTransaction
        ? swap.instructions // newer format
        : swap.instructions || [],
    });
  } catch (err: any) {
    console.error("Jupiter swap-route error:", err);
    return NextResponse.json(
      { error: err?.message || "Swap route failed" },
      { status: 500 }
    );
  }
}
