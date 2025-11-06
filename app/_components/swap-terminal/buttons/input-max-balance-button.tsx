import { useSwap } from "@/app/_context/swap";
import { Button } from "../../common/button";

export const InputMaxlBalanceButton = ({ balance }: { balance: number }) => {
  const { setInputAmount } = useSwap();

  return (
    <Button
      className="p-0 hover:bg-inherit text-sm"
      variant="ghost"
      onClick={() => {
        setInputAmount(balance);
      }}
    >
      Max
    </Button>
  );
};
