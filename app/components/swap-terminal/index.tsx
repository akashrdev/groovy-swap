"use client";
import { Disclaimer } from "./disclaimer";
import { TerminalTabs } from "./tabs";
import { SwapContent } from "./swap-content";
import { useState } from "react";
import { ProfileContent } from "./profile-content";

export enum SWAP_TERMINAL_TAB {
  SWAP = "swap",
  PROFILE = "profile",
}

export const SwapTerminal = () => {
  const [tab, setTab] = useState<SWAP_TERMINAL_TAB>(SWAP_TERMINAL_TAB.SWAP);
  return (
    <div className="flex flex-col sm:w-[500px] w-full">
      <div className="flex justify-end mr-2.5">
        <TerminalTabs setTab={setTab} tab={tab} />
      </div>
      <div className="relative border bg-secondary-dark border-secondary-card rounded-xl min-h-[450px] flex flex-col flex-1">
        {tab === SWAP_TERMINAL_TAB.SWAP ? <SwapContent /> : <ProfileContent />}
      </div>
      <Disclaimer />
    </div>
  );
};
