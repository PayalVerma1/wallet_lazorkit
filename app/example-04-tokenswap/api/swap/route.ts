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

    //  Fetch quote
    const quoteRes = await fetch(
      `${JUPITER_QUOTE_API}?inputMint=${inMint}&outputMint=${outMint}&amount=${amount}&slippageBps=50`
    );

    if (!quoteRes.ok) {
      throw new Error("Failed to fetch Jupiter quote");
    }

    const quote = await quoteRes.json();

    if (!quote.data || quote.data.length === 0) {
      throw new Error("No swap routes available");
    }

    // Pick best route
    const bestRoute = quote.data[0];

    // Fetch swap instructions
    const swapRes = await fetch(JUPITER_SWAP_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteResponse: bestRoute,
        userPublicKey: user,
        wrapAndUnwrapSol: true,
        dynamicComputeUnitLimit: true,
      }),
    });

    if (!swapRes.ok) {
      throw new Error("Failed to fetch Jupiter swap");
    }

    const swap = await swapRes.json();

    // Return ONLY instructions (no signing)
    return NextResponse.json({
      instructions: swap.instructions,
    });
  } catch (err: unknown) {
    console.error("Jupiter swap-route error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Swap route failed" },
      { status: 500 }
    );
  }
}
