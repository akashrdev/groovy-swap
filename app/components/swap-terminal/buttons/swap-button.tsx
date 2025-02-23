import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "../../common/button";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useSwap } from "@/app/context/swap";
import { useGetQuote } from "@/app/hooks/use-get-quote";
import { scaleApiInputAmount } from "@/app/utils/token-amounts/scale-api-input-amount";
import { useHandleTx } from "@/app/hooks/use-handle-tx";
import { useToast } from "@/app/context/toast";

export const SwapButton = () => {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { showToast } = useToast();
  const {
    createSwapInstruction,
    selectedInputToken,
    selectedOutputToken,
    inputAmount,
  } = useSwap();

  const formattedInputAmount = scaleApiInputAmount(
    inputAmount,
    selectedInputToken.decimals
  );

  const { data: quote } = useGetQuote({
    inputTokenMint: selectedInputToken.mintAddress,
    inputAmount: formattedInputAmount,
    outputTokenMint: selectedOutputToken.mintAddress,
  });

  const { handleTx } = useHandleTx();

  const handle = async () => {
    try {
      showToast({
        title: "Processing Transaction",
        message: "Your transaction is being processed",
      });
      const ix = await createSwapInstruction(quote);
      const result = await handleTx({ ix });

      if (result && result.signatures.length > 0) {
        showToast({
          title: "Success",
          message: "Your transaction was processed sucessfully",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      showToast({
        title: "Error",
        message: "There was an error while processing your transaction",
      });
    }
  };

  return (
    <>
      <Button
        size="xl"
        variant="primary"
        onClick={() => (connected ? handle() : setVisible(true))}
      >
        <span>{connected ? "Swap" : "Connect Wallet"}</span>
      </Button>
    </>
  );
};
