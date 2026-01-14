import { JitoNetworkContext } from "@/app/_context/jito-network";
import { useContext } from "react";

export const useJitoNetwork = () => {
  const context = useContext(JitoNetworkContext);
  if (!context) {
    throw new Error("Missing Jito network context!");
  }
  return context;
};
