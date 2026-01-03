import { NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, createTransferInstruction } from "@solana/spl-token";

const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const SWAP_MERCHANT = new PublicKey("EEE2dZ4EHFHmgG24zKgVUutCXQqtYTLJCEAWoNcNAXTj");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { inMint, outMint, amount, user } = body || {};

    if (!user || !amount) {
      return NextResponse.json({ error: "missing user or amount" }, { status: 400 });
    }

    const userPub = new PublicKey(user);

    // For demo purposes we return a single transfer instruction that sends USDC
    // from the user's USDC ATA to a merchant ATA. In a real integration you would
    // call a DEX aggregator (e.g. Jupiter) and return the route's instructions.
    const fromATA = await getAssociatedTokenAddress(USDC_MINT, userPub, true);
    const toATA = await getAssociatedTokenAddress(USDC_MINT, SWAP_MERCHANT, true);

    const ix = createTransferInstruction(fromATA, toATA, userPub, BigInt(amount));

    const serializable = {
      instructions: [
        {
          programId: ix.programId.toBase58(),
          keys: ix.keys.map((k) => ({ pubkey: k.pubkey.toBase58(), isSigner: k.isSigner, isWritable: k.isWritable })),
          data: Buffer.from(ix.data).toString("base64"),
        },
      ],
    };

    return NextResponse.json(serializable);
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
