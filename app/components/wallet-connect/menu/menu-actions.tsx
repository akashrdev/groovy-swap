import * as DropDownMenu from "@radix-ui/react-dropdown-menu";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const WalletConnectMenuActions = () => {
  const { disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  return (
    <div className="bg-primary-card px-4 py-3 rounded-xl flex flex-col items-center gap-3 cursor-pointer">
      <DropDownMenu.Item
        onClick={() => setVisible(true)}
        className="hover:bg-primary-card-hover py-1 px-2"
      >
        <span>Change Wallet</span>
      </DropDownMenu.Item>

      <DropDownMenu.Item
        onClick={disconnect}
        className="hover:bg-primary-card-hover py-1 px-2"
      >
        <span>Disconnect</span>
      </DropDownMenu.Item>
    </div>
  );
};
