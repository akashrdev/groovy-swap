import { Button } from "../common/button";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const ConnectionTrigger = () => {
  const { setVisible } = useWalletModal();
  return (
    <Button variant="primary" size="md" onClick={() => setVisible(true)}>
      Connect Wallet
    </Button>
  );
};
