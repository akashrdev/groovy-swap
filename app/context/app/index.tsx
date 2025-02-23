"use client";

import { ReactNode, useMemo } from "react";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import {
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  HuobiWalletAdapter,
  MathWalletAdapter,
  NekoWalletAdapter,
  NightlyWalletAdapter,
  PhantomWalletAdapter,
  SalmonWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SelectedTokensProvider } from "../swap";
import { ToastProvider } from "../toast";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  const wallets = useMemo(
    () => [
      new BackpackWalletAdapter(),
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new TorusWalletAdapter(),
      new MathWalletAdapter(),
      new Coin98WalletAdapter(),
      new CloverWalletAdapter(),
      new HuobiWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new NekoWalletAdapter(),
      new TrustWalletAdapter(),
      new NightlyWalletAdapter(),
      new SalmonWalletAdapter(),
    ],
    []
  );

  const endpoint: string = process.env.NEXT_PUBLIC_RPC_URL as string;

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <SelectedTokensProvider>
              <ToastProvider>{children}</ToastProvider>
            </SelectedTokensProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
};
