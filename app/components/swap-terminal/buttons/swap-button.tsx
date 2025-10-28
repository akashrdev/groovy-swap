"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "../../common/button";
import { useSwap } from "@/app/context/swap";
import { useGetQuote } from "@/app/hooks/use-get-quote";
import { scaleApiInputAmount } from "@/app/utils/token-amounts/scale-api-input-amount";
import { useHandleTx } from "@/app/hooks/use-handle-tx";
import { useToast } from "@/app/context/toast";
import { ConnectWalletButton } from "../../buttons/connect-wallet-button";
import { useQueryClient } from "@tanstack/react-query";
import { sleep } from "@/app/utils/sleep";

export const SwapButton = () => {
  const { connected, publicKey } = useWallet();
  const { showToast } = useToast();
  const {
    createSwapInstruction,
    selectedInputToken,
    selectedOutputToken,
    inputAmount
  } = useSwap();

  const queryClient = useQueryClient();

  const formattedInputAmount = scaleApiInputAmount(
    inputAmount,
    selectedInputToken.decimals
  );

  const { data: quote } = useGetQuote({
    inputTokenMint: selectedInputToken.mintAddress,
    inputAmount: formattedInputAmount,
    outputTokenMint: selectedOutputToken.mintAddress
  });

  const { handleTx } = useHandleTx();

  const handle = async () => {
    try {
      showToast({
        title: "Processing Transaction",
        message: "Your transaction is being processed"
      });
      const { instructions, addressLookupTables } =
        await createSwapInstruction(quote);
      const result = await handleTx({ ix: instructions, addressLookupTables });

      if (result && result.signatures.length > 0) {
        await sleep({
          time: 3_000,
          callBack: async () => {
            await queryClient.invalidateQueries({
              queryKey: ["tokenBalances", publicKey?.toBase58()],
              type: "active"
            });
          }
        });

        showToast({
          title: "Success",
          message: "Your transaction was processed sucessfully"
        });
      }
    } catch (err) {
      console.error("Error:", err);
      showToast({
        title: "Error",
        message: "There was an error while processing your transaction"
      });
    }
  };

  return (
    <>
      {connected ? (
        <Button size="xl" variant="primary" onClick={handle}>
          Swap
        </Button>
      ) : (
        <ConnectWalletButton size="xl" />
      )}
    </>
  );
};
