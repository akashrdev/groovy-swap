import {
  AddressLookupTableAccount,
  Connection,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { BYTE_SIZE_LIMIT } from "./chunk-ix";

export const simulateTx = async ({
  instructions,
  connection,
  payer,
  addressLookupTables,
}: {
  instructions: TransactionInstruction[];
  connection: Connection;
  payer: PublicKey;
  addressLookupTables?: AddressLookupTableAccount[];
}) => {
  try {
    const { blockhash } = await connection.getLatestBlockhash();

    const message = new TransactionMessage({
      payerKey: payer,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message(addressLookupTables || undefined);

    const tx = new VersionedTransaction(message);
    const txSize = tx.serialize().length;

    return {
      txSize,
    };
  } catch {
    return {
      txSize: BYTE_SIZE_LIMIT + 1,
    };
  }
};
