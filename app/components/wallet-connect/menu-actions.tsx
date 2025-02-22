import * as DropDownMenu from "@radix-ui/react-dropdown-menu";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const WalletConnectMenuActions = () => {
  const { disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  return (
    <>
      <DropDownMenu.Item
        onClick={() => setVisible(true)}
        className="cursor-pointer"
      >
        <span>Change Wallet</span>
      </DropDownMenu.Item>

      <DropDownMenu.Item onClick={disconnect} className="cursor-pointer">
        <span>Disconnect</span>
      </DropDownMenu.Item>
    </>
  );
};
