import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { simulateTx } from "./simulate-tx";

export const BYTE_SIZE_LIMIT = 1232;

export const chunkIx = async ({
  connection,
  publicKey,
  instructions,
}: {
  connection: Connection;
  publicKey: PublicKey;
  instructions: TransactionInstruction[];
}) => {
  const chunks: TransactionInstruction[][] = [];
  let currentChunk: TransactionInstruction[] = [];
  for (const ix of instructions) {
    const simulatedTx = await simulateTx({
      connection,
      payer: publicKey,
      instructions: [...currentChunk, ix],
    });

    if (simulatedTx.txSize > BYTE_SIZE_LIMIT) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
      }
      currentChunk = [ix];
    } else {
      currentChunk.push(ix);
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
};
