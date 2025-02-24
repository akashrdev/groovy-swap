import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button, ButtonProps } from "../common/button";

export const ConnectWalletButton = ({
  className,
  size,
}: {
  className?: string;
  size?: ButtonProps["size"];
}) => {
  const { setVisible } = useWalletModal();
  return (
    <Button
      variant="primary"
      className={className}
      size={size || "lg"}
      onClick={() => setVisible(true)}
    >
      Connect Wallet
    </Button>
  );
};
