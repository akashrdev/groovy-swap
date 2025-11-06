"use client";

import { DEFAULT_TOKEN_LIST } from "@/app/_constants/token-list";
import { APIResponseQuote } from "@/app/_hooks/use-get-quote";
import { TokenItem } from "@/app/_types/token-item";
import {
  AddressLookupTableAccount,
  Connection,
  PublicKey,
  TransactionInstruction
} from "@solana/web3.js";
import axios from "axios";

import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface SwapInstructionReturn {
  instructions: TransactionInstruction[];
  addressLookupTables: AddressLookupTableAccount[];
}

export enum TOKEN_DIRECTION {
  OUTPUT = "output",
  INPUT = "input"
}

export enum SWAP_TERMINAL_TAB {
  SWAP = "swap",
  PROFILE = "profile"
}

interface SwapState {
  selectedInputToken: TokenItem;
  setSelectedInputToken: (token: TokenItem) => void;
  inputAmount: number | string;
  setInputAmount: (inputAmount: number | string) => void;
  selectedOutputToken: TokenItem;
  setSelectedOutputToken: (token: TokenItem) => void;
  tab: SWAP_TERMINAL_TAB;
  setTab: (tab: SWAP_TERMINAL_TAB) => void;
  createSwapInstruction: (
    quote: APIResponseQuote,
    connection: Connection,
    publicKey: PublicKey | null
  ) => Promise<SwapInstructionReturn>;
}

export const useSwapStore = create<SwapState>()(
  persist(
    (set) => ({
      selectedInputToken: DEFAULT_TOKEN_LIST.USDC,
      selectedOutputToken: DEFAULT_TOKEN_LIST.SOL,
      inputAmount: "",
      tab: SWAP_TERMINAL_TAB.SWAP,

      setSelectedInputToken: (token) => set({ selectedInputToken: token }),
      setSelectedOutputToken: (token) => set({ selectedOutputToken: token }),
      setInputAmount: (amount) => set({ inputAmount: amount }),
      setTab: (tab) => set({ tab }),

      createSwapInstruction: async (
        quote: APIResponseQuote,
        connection: Connection,
        publicKey: PublicKey | null
      ) => {
        if (!publicKey) return { instructions: [], addressLookupTables: [] };
        try {
          const { data } = await axios.post(
            "https://lite-api.jup.ag/swap/v1/swap-instructions",
            {
              quoteResponse: quote,
              userPublicKey: publicKey.toBase58(),
              dynamicComputeUnitLimit: true,
              dynamicSlippage: true,
              prioritizationFeeLamports: {
                priorityLevelWithMaxLamports: {
                  maxLamports: 50000000,
                  global: false,
                  priorityLevel: "medium"
                }
              }
            }
          );

          const {
            computeBudgetInstructions,
            setupInstructions,
            swapInstruction: swapInstructionPayload,
            cleanupInstruction,
            addressLookupTableAddresses
          } = data;

          const getAddressLookupTableAccounts = async (
            keys: string[]
          ): Promise<AddressLookupTableAccount[]> => {
            const addressLookupTableAccountInfos =
              await connection.getMultipleAccountsInfo(
                keys.map((key) => new PublicKey(key))
              );

            return addressLookupTableAccountInfos.reduce(
              (acc, accountInfo, index) => {
                const addressLookupTableAddress = keys[index];
                if (accountInfo) {
                  const addressLookupTableAccount =
                    new AddressLookupTableAccount({
                      key: new PublicKey(addressLookupTableAddress),
                      state: AddressLookupTableAccount.deserialize(
                        accountInfo.data
                      )
                    });
                  acc.push(addressLookupTableAccount);
                }

                return acc;
              },
              new Array<AddressLookupTableAccount>()
            );
          };

          const addressLookupTables: AddressLookupTableAccount[] = [];

          addressLookupTables.push(
            ...(await getAddressLookupTableAccounts(
              addressLookupTableAddresses
            ))
          );

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
                    isWritable
                  })
                ),
                data: Buffer.from(instruction.data, "base64")
              });
            });

          const instructions = [
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
                  isWritable: account.isWritable
                })
              ),
              data: Buffer.from(swapInstructionPayload.data, "base64")
            }),
            ...parseInstructions(cleanupInstruction ? [cleanupInstruction] : [])
          ];
          return { instructions, addressLookupTables };
        } catch (error) {
          console.error("Error creating swap instruction:", error);
          throw error;
        }
      }
    }),
    {
      name: "swap-storage"
    }
  )
);
