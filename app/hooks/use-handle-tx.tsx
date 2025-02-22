import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { chunkIx } from "../utils/transaction/chunk-ix";

export const useHandleTx = () => {
  const { connection } = useConnection();
  const { publicKey, signAllTransactions, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const handleTx = async ({ ix }: { ix: TransactionInstruction[] }) => {
    if (!connected) {
      setVisible(true);
      return;
    }

    if (!publicKey || !signAllTransactions) return;

    try {
      const { blockhash } = await connection.getLatestBlockhash();

      const validatedInstructions = ix.map((instruction) => {
        return new TransactionInstruction({
          programId: new PublicKey(instruction.programId),
          keys: instruction.keys.map(({ pubkey, isSigner, isWritable }) => ({
            pubkey:
              pubkey instanceof PublicKey ? pubkey : new PublicKey(pubkey),
            isSigner,
            isWritable,
          })),
          data: instruction.data,
        });
      });

      const chunks = await chunkIx({
        connection,
        publicKey,
        instructions: validatedInstructions,
      });

      const messageV0 = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: blockhash,
        instructions: chunks.flat(),
      }).compileToV0Message();

      const tx = new VersionedTransaction(messageV0);

      const signedTxs = await signAllTransactions([tx]);

      const signatures = await Promise.all(
        signedTxs.map((signedTx) =>
          connection.sendRawTransaction(signedTx.serialize(), { maxRetries: 4 })
        )
      );

      console.log("Signatures:", signatures);
      return { signatures };
    } catch (err) {
      throw err;
    }
  };
  return { handleTx };
};
