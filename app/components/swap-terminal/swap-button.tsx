import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "../common/button";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useSwap } from "@/app/context/swap";
import { useGetQuote } from "@/app/hooks/use-get-quote";
import { scaleApiInputAmount } from "@/app/utils/token-amounts/scale-api-input-amount";
import { useHandleTx } from "@/app/hooks/use-handle-tx";
import { useState } from "react";
import { Toast } from "../common/toast";

export const SwapButton = () => {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
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

  console.log("quote", quote);

  const { handleTx } = useHandleTx();

  const handle = async () => {
    try {
      setToastVisible(true);
      setToastTitle("Processing");
      setToastMessage("Processing your transaction");
      const ix = await createSwapInstruction(quote);
      const result = await handleTx({ ix });

      if (result && result.signatures.length > 0) {
        console.log(result);
        setToastTitle("Success");
        setToastMessage("Your has been transaction completed sucessfully");
      }
    } catch (err) {
      console.error("Error:", err);
      setToastTitle("Transaction Error");
      setToastMessage("Error:" + err);
    } finally {
      setToastVisible(false);
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
      {toastVisible && <Toast title={toastTitle} content={toastMessage} />}
    </>
  );
};
