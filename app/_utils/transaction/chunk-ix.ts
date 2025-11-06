import {
  AddressLookupTableAccount,
  Connection,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { simulateTx } from "./simulate-tx";

export const BYTE_SIZE_LIMIT = 1232;

export const chunkIx = async ({
  connection,
  publicKey,
  instructions,
  addressLookupTables,
}: {
  connection: Connection;
  publicKey: PublicKey;
  instructions: TransactionInstruction[];
  addressLookupTables?: AddressLookupTableAccount[];
}) => {
  const chunks: TransactionInstruction[][] = [];
  let currentChunk: TransactionInstruction[] = [];

  for (const ix of instructions) {
    currentChunk.push(ix);

    const simulatedTx = await simulateTx({
      connection,
      payer: publicKey,
      instructions: currentChunk,
      addressLookupTables,
    });

    if (simulatedTx.txSize > BYTE_SIZE_LIMIT) {
      currentChunk.pop();
      chunks.push([...currentChunk]);

      currentChunk = [ix];
    }
  }

  if (currentChunk.length > 0) {
    chunks.push([...currentChunk]);
  }

  return chunks;
};
