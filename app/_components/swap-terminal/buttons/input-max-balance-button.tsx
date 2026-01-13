import { useSwapStore } from "../../_stores/useSwapStore";
import { Button } from "../../common/button";

export const InputMaxlBalanceButton = ({ balance }: { balance: number }) => {
  const { setInputAmount } = useSwapStore();

  return (
    <Button
      className="p-0 hover:bg-inherit text-xl font-ppneuebit"
      variant="ghost"
      onClick={() => {
        setInputAmount(balance);
      }}
    >
      Max
    </Button>
  );
};
