"use client";
import { Disclaimer } from "./disclaimer";
import { TerminalTabs } from "./tabs";
import { SwapContent } from "./swap-content";
import { ProfileContent } from "./profile-content";

import { SWAP_TERMINAL_TAB, useSwapStore } from "../_stores/useSwapStore";

export const SwapTerminal = () => {
  const { tab, setTab } = useSwapStore();
  return (
    <div className="flex flex-col sm:w-[500px]  w-full">
      <div className="flex justify-end mr-2.5">
        <TerminalTabs setTab={setTab} tab={tab || SWAP_TERMINAL_TAB.SWAP} />
      </div>
      <div className="relative border bg-gradient-secondary border-secondary-card rounded-xl h-[450px] flex flex-col">
        {tab === SWAP_TERMINAL_TAB.SWAP ? <SwapContent /> : <ProfileContent />}
      </div>
      <Disclaimer className="mt-2" />
    </div>
  );
};
