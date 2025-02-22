import {
  Connection,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

export const simulateTx = async ({
  instructions,
  connection,
  payer,
}: {
  instructions: TransactionInstruction[];
  connection: Connection;
  payer: PublicKey;
}) => {
  const { blockhash } = await connection.getLatestBlockhash();

  const message = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  const tx = new VersionedTransaction(message);
  const txSize = tx.serialize().length;
  const { value } = await connection.simulateTransaction(tx);

  return {
    isValid: !value.err,
    error: value.err,
    logs: value.logs,
    computeUsage: value.unitsConsumed,
    txSize,
  };
};
