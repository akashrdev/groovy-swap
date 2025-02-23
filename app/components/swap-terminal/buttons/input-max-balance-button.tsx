import { useSwap } from "@/app/context/swap";
import { Button } from "../../common/button";

export const InputMaxlBalanceButton = ({ balance }: { balance: number }) => {
  const { setInputAmount } = useSwap();

  return (
    <Button
      className="p-0 hover:bg-inherit"
      variant="ghost"
      onClick={() => {
        setInputAmount(balance);
      }}
    >
      Max
    </Button>
  );
};
