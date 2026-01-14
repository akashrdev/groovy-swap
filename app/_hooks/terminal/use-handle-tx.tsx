import { chunkIx } from "@/app/_utils/transaction/chunk-ix";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
  AddressLookupTableAccount,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction
} from "@solana/web3.js";

export const useHandleTx = () => {
  const { connection } = useConnection();
  const { publicKey, signAllTransactions, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const handleTx = async ({
    ix,
    addressLookupTables
  }: {
    ix: TransactionInstruction[];
    addressLookupTables?: AddressLookupTableAccount[];
  }) => {
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
            isWritable
          })),
          data: instruction.data
        });
      });

      const chunks = await chunkIx({
        connection,
        publicKey,
        instructions: validatedInstructions,
        addressLookupTables
      });

      const txs: VersionedTransaction[] = [];

      for (const chunk of chunks) {
        const messageV0 = new TransactionMessage({
          payerKey: publicKey,
          recentBlockhash: blockhash,
          instructions: chunk
        }).compileToV0Message(addressLookupTables || undefined);

        txs.push(new VersionedTransaction(messageV0));
      }

      const signedTxs = await signAllTransactions(txs);

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
