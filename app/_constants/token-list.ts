import { TokenItem } from "../_types/token-item";

export const DEFAULT_TOKEN_LIST: Record<string, TokenItem> = {
  USDC: {
    mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin"
  },
  SOL: {
    mintAddress: "So11111111111111111111111111111111111111112",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    symbol: "SOL",
    decimals: 9,
    name: "Solana"
  }
};
