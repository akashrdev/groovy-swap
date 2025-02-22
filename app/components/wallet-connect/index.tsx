import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectionTrigger } from "./connection-trigger";
import { WalletConnectMenu } from "./menu";

export const WalletConnect = () => {
  const { connected } = useWallet();
  return !connected ? <ConnectionTrigger /> : <WalletConnectMenu />;
};
