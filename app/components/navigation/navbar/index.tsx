"use client";
import { WalletConnect } from "../../wallet-connect";

export const Navbar = () => {
  return (
    <div className="w-screen border-b border-b-primary-border sticky left-0 right-0 top-0 h-14 px-6 py-2 justify-between flex">
      <span className="font-ranchers text-4xl text-primary-btn">
        Groovy Swap
      </span>
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-4">
        {/* <Button variant="ghost">Swap</Button> // TODO: Re-add when pages ready
        <Button variant="ghost">Profile</Button> */}
      </div>
      <div className="ml-auto">
        <WalletConnect />
      </div>
    </div>
  );
};
