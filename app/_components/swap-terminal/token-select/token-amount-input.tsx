import { twMerge } from "tailwind-merge";
import { getFormattedAmount } from "@/app/_utils/token-amounts/get-formatted-amount";
import { scaleApiInputAmount } from "@/app/_utils/token-amounts/scale-api-input-amount";

import { useForm, Controller } from "react-hook-form";
import { round } from "@/app/_utils/numbers/round";

import { useEffect, useMemo } from "react";
import { DEFAULT_TOKEN_LIST } from "@/app/_constants/token-list";
import { WalletMinimalIcon } from "lucide-react";
import { InputMaxlBalanceButton } from "../buttons/input-max-balance-button";

import { normalizeDecimalInput } from "@/app/_utils/numbers/normalize-decimal-input";
import { Skeleton } from "../../common/skeleton";
import { TOKEN_DIRECTION, useSwapStore } from "../../_stores/useSwapStore";
import { useGetQuote } from "@/app/_hooks/terminal/use-get-quote";
import { useGetUsdPrice } from "@/app/_hooks/terminal/use-get-usd-price";
import { useGetWalletTokensBalance } from "@/app/_hooks/terminal/use-get-wallet-token-balance";

const decimalsAndEmptyInputAllowed = /^\d*\.?\d*$/;

export const TokenAmountInput = ({
  tokenDirection
}: {
  tokenDirection: TOKEN_DIRECTION;
}) => {
  const {
    setInputAmount,
    inputAmount,
    selectedInputToken,
    selectedOutputToken
  } = useSwapStore();

  const formattedInputAmount = scaleApiInputAmount(
    inputAmount,
    selectedInputToken.decimals
  );

  const { data: quote } = useGetQuote({
    inputTokenMint: selectedInputToken.mintAddress,
    inputAmount: formattedInputAmount,
    outputTokenMint: selectedOutputToken.mintAddress
  });
  const mintAddress =
    tokenDirection === TOKEN_DIRECTION.INPUT
      ? selectedInputToken.mintAddress
      : selectedOutputToken.mintAddress;

  const { data } = useGetUsdPrice({ mintAddresses: [mintAddress] });
  const usdPrice = data ? data[0].usdPrice : 0;

  const formattedOutputAmount = getFormattedAmount(
    quote?.outAmount || 0,
    selectedOutputToken.decimals
  );

  const formMethods = useForm({
    defaultValues: {
      amount: inputAmount.toString()
    }
  });
  const { control, setValue } = formMethods;

  const { data: walletTokenBalance, isLoading } = useGetWalletTokensBalance();

  const usdTotal = (usdPrice ?? 0) * Number(inputAmount);

  const formattedUsdTotal = round(usdTotal);

  const inputTokenBalance = useMemo(() => {
    if (!walletTokenBalance) return 0;

    if (selectedInputToken.mintAddress === DEFAULT_TOKEN_LIST.SOL.mintAddress) {
      return walletTokenBalance.formattedSolBalance || 0;
    } else {
      const inputToken = walletTokenBalance.tokenBalances?.find(
        (token) => token.mintAddress === selectedInputToken.mintAddress
      );
      return inputToken?.balance || 0;
    }
  }, [walletTokenBalance, selectedInputToken.mintAddress]);

  const outputTokenBalance = useMemo(() => {
    if (!walletTokenBalance) return 0;

    if (
      selectedOutputToken.mintAddress === DEFAULT_TOKEN_LIST.SOL.mintAddress
    ) {
      return walletTokenBalance.formattedSolBalance || 0;
    } else {
      const outputToken = walletTokenBalance.tokenBalances?.find(
        (token) => token.mintAddress === selectedOutputToken.mintAddress
      );
      return outputToken?.balance || 0;
    }
  }, [walletTokenBalance, selectedOutputToken.mintAddress]);

  useEffect(() => {
    setValue("amount", inputAmount.toString());
  }, [inputAmount, setValue]);

  const displayedBalance =
    tokenDirection === TOKEN_DIRECTION.INPUT
      ? `${inputTokenBalance} ${selectedInputToken.symbol}`
      : `${outputTokenBalance} ${selectedOutputToken.symbol}`;

  return (
    <div className="relative font-aeonik">
      <div className="flex absolute top-[-28px] left-1 text-primary-accent items-center justify-between w-full">
        <div className="flex gap-1 items-center">
          <WalletMinimalIcon height={15} width={15} />
          {!isLoading ? (
            <span className="sm:text-xs text-[10px]">{displayedBalance}</span>
          ) : (
            <Skeleton className="w-28 h-5 rounded-md" />
          )}
        </div>

        {tokenDirection === TOKEN_DIRECTION.INPUT && (
          <InputMaxlBalanceButton balance={inputTokenBalance} />
        )}
      </div>

      <Controller
        name="amount"
        control={control}
        rules={{
          pattern: decimalsAndEmptyInputAllowed
        }}
        render={({ field }) => (
          <input
            {...field}
            className={twMerge(
              "sm:h-16 h-14  rounded-xl text-primary-brand bg-secondary-accent sm:px-5 py-5 px-2  sm:text-sm text-xs",
              tokenDirection === TOKEN_DIRECTION.INPUT
                ? "cursor-text"
                : "cursor-not-allowed"
            )}
            value={
              tokenDirection === TOKEN_DIRECTION.INPUT
                ? field.value
                : formattedOutputAmount === 0
                  ? ""
                  : formattedOutputAmount
            }
            onChange={(e) => {
              const value = normalizeDecimalInput(e.target.value);

              if (value === "" || decimalsAndEmptyInputAllowed.test(value)) {
                setValue("amount", value);
                setInputAmount(value);
              }
            }}
            disabled={tokenDirection === TOKEN_DIRECTION.OUTPUT}
            inputMode="decimal"
          />
        )}
      />
      {tokenDirection === TOKEN_DIRECTION.INPUT && (
        <span className="absolute bottom-[-28px] left-1 text-primary-brand/60 sm:text-sm text-xs">
          ${formattedUsdTotal}
        </span>
      )}
    </div>
  );
};
