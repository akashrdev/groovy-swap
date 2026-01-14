import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";
import { NETWORKS } from "../_hooks/block-engine-explorer/get-all-region-latency";

interface JitoNetworkContextValue {
  currentNetwork: NETWORKS;
  setCurrentNetwork: Dispatch<SetStateAction<NETWORKS>>;
}

export const JitoNetworkContext = createContext<null | JitoNetworkContextValue>(
  null
);

export const JitoNetworkProvider = ({ children }: { children: ReactNode }) => {
  const [currentNetwork, setCurrentNetwork] = useState(NETWORKS.MAINNET);

  return (
    <JitoNetworkContext.Provider value={{ currentNetwork, setCurrentNetwork }}>
      {children}
    </JitoNetworkContext.Provider>
  );
};
