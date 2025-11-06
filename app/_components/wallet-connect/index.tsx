import { useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectMenu } from "./menu";
import { ConnectWalletButton } from "../buttons/connect-wallet-button";

export const WalletConnect = () => {
  const { connected } = useWallet();
  return !connected ? <ConnectWalletButton size="md" /> : <WalletConnectMenu />;
};
