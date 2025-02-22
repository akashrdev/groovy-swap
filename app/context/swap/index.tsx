"use client";

import { DEFAULT_TOKEN_LIST } from "@/app/constants/token-list";
import { APIResponseQuote } from "@/app/hooks/use-get-quote";
import { TokenItem } from "@/app/types/token-item";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";

export interface InstructionAccount {
  pubkey: string;
  isSigner: boolean;
  isWritable: boolean;
}

export interface SwapInstructions {
  tokenLedgerInstruction?: TransactionInstruction;
  computeBudgetInstructions?: TransactionInstruction[];
  setupInstructions?: TransactionInstruction[];
  swapInstruction: TransactionInstruction;
  cleanupInstruction?: TransactionInstruction;
  addressLookupTableAddresses?: PublicKey[];
  programId: string;
  accounts: InstructionAccount[];
  data: string;
}

export enum TOKEN_DIRECTION {
  OUTPUT = "output",
  INPUT = "input",
}

interface SwapContextType {
  selectedInputToken: TokenItem;
  setSelectedInputToken: (token: TokenItem) => void;
  inputAmount: number;
  setInputAmount: (inputAmount: number) => void;
  selectedOutputToken: TokenItem;
  setSelectedOutputToken: (token: TokenItem) => void;
  createSwapInstruction: (
    quote: APIResponseQuote
  ) => Promise<TransactionInstruction[]>;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export const SelectedTokensProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedInputToken, setSelectedInputToken] = useState<TokenItem>(
    DEFAULT_TOKEN_LIST.USDC
  );
  const [selectedOutputToken, setSelectedOutputToken] = useState<TokenItem>(
    DEFAULT_TOKEN_LIST.SOL
  );

  const [inputAmount, setInputAmount] = useState(0);
  const { publicKey } = useWallet();

  const createSwapInstruction = async (quote: APIResponseQuote) => {
    if (!publicKey) return [];
    try {
      const { data } = await axios.post(
        "https://api.jup.ag/swap/v1/swap-instructions",
        {
          quoteResponse: quote,
          userPublicKey: publicKey.toBase58(),
          dynamicComputeUnitLimit: true,
          dynamicSlippage: true,
          prioritizationFeeLamports: {
            priorityLevelWithMaxLamports: {
              maxLamports: 50000000,
              global: false,
              priorityLevel: "medium",
            },
          },
        }
      );

      const {
        computeBudgetInstructions,
        setupInstructions,
        swapInstruction: swapInstructionPayload,
        cleanupInstruction,
      } = data;

      const parseInstructions = (
        instructions: {
          accounts: InstructionAccount[];
          programId: string;
          data: string;
        }[] = []
      ) =>
        instructions.map((instruction) => {
          return new TransactionInstruction({
            programId: new PublicKey(instruction.programId),
            keys: instruction.accounts.map(
              ({ pubkey, isSigner, isWritable }) => ({
                pubkey: new PublicKey(pubkey),
                isSigner,
                isWritable,
              })
            ),
            data: Buffer.from(instruction.data, "base64"),
          });
        });

      return [
        ...parseInstructions(computeBudgetInstructions),
        ...parseInstructions(setupInstructions),
        new TransactionInstruction({
          programId: new PublicKey(swapInstructionPayload.programId),
          keys: swapInstructionPayload.accounts.map(
            (account: {
              pubkey: string;
              isSigner: boolean;
              isWritable: boolean;
            }) => ({
              pubkey: new PublicKey(account.pubkey),
              isSigner: account.isSigner,
              isWritable: account.isWritable,
            })
          ),
          data: Buffer.from(swapInstructionPayload.data, "base64"),
        }),
        ...parseInstructions(cleanupInstruction ? [cleanupInstruction] : []),
      ];
    } catch (error) {
      console.error("Error creating swap instruction:", error);
      throw error;
    }
  };

  return (
    <SwapContext.Provider
      value={{
        selectedInputToken,
        setSelectedInputToken,
        inputAmount,
        setInputAmount,
        selectedOutputToken,
        setSelectedOutputToken,
        createSwapInstruction,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error("Swap provider is not initialized");
  }
  return context;
};
