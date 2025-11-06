import { ArrowUpDown } from "lucide-react";
import { Button } from "../../common/button";
import { twMerge } from "tailwind-merge";
import { useSwapStore } from "../../_stores/useSwapStore";

export const SwitchDirectionButton = ({
  className
}: {
  className?: string;
}) => {
  const {
    setSelectedOutputToken,
    setSelectedInputToken,
    selectedInputToken,
    selectedOutputToken
  } = useSwapStore();

  const handleSwitch = () => {
    setSelectedInputToken(selectedOutputToken);
    setSelectedOutputToken(selectedInputToken);
  };

  return (
    <Button
      onClick={handleSwitch}
      variant="primary"
      className={twMerge("rounded-full", className)}
    >
      <ArrowUpDown width={15} height={15} />
    </Button>
  );
};
