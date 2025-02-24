import { twMerge } from "tailwind-merge";
import { TOKEN_DIRECTION, useSwap } from "@/app/context/swap";
import { getFormattedAmount } from "@/app/utils/token-amounts/get-formatted-amount";
import { scaleApiInputAmount } from "@/app/utils/token-amounts/scale-api-input-amount";
import { useGetQuote } from "@/app/hooks/use-get-quote";
import { useForm, Controller } from "react-hook-form";
import { round } from "@/app/utils/numbers/round";
import { useGetWalletTokensBalance } from "@/app/hooks/use-get-wallet-token-balance";
import { useEffect, useState } from "react";
import { DEFAULT_TOKEN_LIST } from "@/app/constants/token-list";
import { WalletMinimalIcon } from "lucide-react";
import { InputMaxlBalanceButton } from "../buttons/input-max-balance-button";
import { getUsdPrice } from "@/app/utils/price/get-usd-price";

const decimalsAndEmptyInputAllowed = /^\d*\.?\d*$/;

export const TokenAmountInput = ({
  tokenDirection,
}: {
  tokenDirection: TOKEN_DIRECTION;
}) => {
  const [usdPrice, setUsdPrice] = useState(0);
  const {
    setInputAmount,
    inputAmount,
    selectedInputToken,
    selectedOutputToken,
  } = useSwap();

  const formattedInputAmount = scaleApiInputAmount(
    inputAmount,
    selectedInputToken.decimals
  );

  const { data: quote } = useGetQuote({
    inputTokenMint: selectedInputToken.mintAddress,
    inputAmount: formattedInputAmount,
    outputTokenMint: selectedOutputToken.mintAddress,
  });

  const formattedOutputAmount = getFormattedAmount(
    quote?.outAmount || 0,
    selectedOutputToken.decimals
  );

  const formMethods = useForm({
    defaultValues: {
      amount: inputAmount.toString(),
    },
  });
  const { control, setValue } = formMethods;

  useEffect(() => {
    const getPrice = async () => {
      const mintAddress =
        tokenDirection === TOKEN_DIRECTION.INPUT
          ? selectedInputToken.mintAddress
          : selectedOutputToken.mintAddress;
      const priceMap = await getUsdPrice({
        mintAddresses: [mintAddress],
      });

      const price = priceMap[mintAddress];
      setUsdPrice(price);
    };

    getPrice();
  }, [
    selectedInputToken.mintAddress,
    selectedOutputToken.mintAddress,
    tokenDirection,
  ]);

  const { data: walletTokenBalance } = useGetWalletTokensBalance();

  const usdTotal = (usdPrice ?? 0) * Number(inputAmount);

  const formattedUsdTotal = round(usdTotal);
  const [outputTokenBalance, setOutputTokenBalance] = useState(0);
  const [inputTokenBalance, setInputTokenBalance] = useState(0);

  useEffect(() => {
    if (!walletTokenBalance) return;

    if (selectedInputToken.mintAddress === DEFAULT_TOKEN_LIST.SOL.mintAddress) {
      setInputTokenBalance(walletTokenBalance.formattedSolBalance || 0);
    } else {
      const inputToken = walletTokenBalance.tokenBalances?.find(
        (token) => token.mintAddress === selectedInputToken.mintAddress
      );
      setInputTokenBalance(inputToken?.balance || 0);
    }

    if (
      selectedOutputToken.mintAddress === DEFAULT_TOKEN_LIST.SOL.mintAddress
    ) {
      setOutputTokenBalance(walletTokenBalance.formattedSolBalance || 0);
    } else {
      const outputToken = walletTokenBalance.tokenBalances?.find(
        (token) => token.mintAddress === selectedOutputToken.mintAddress
      );
      setOutputTokenBalance(outputToken?.balance || 0);
    }
  }, [
    walletTokenBalance,
    selectedInputToken.mintAddress,
    selectedOutputToken.mintAddress,
  ]);

  useEffect(() => {
    setValue("amount", inputAmount.toString());
  }, [inputAmount, setValue]);

  const displayedBalance =
    tokenDirection === TOKEN_DIRECTION.INPUT
      ? `${inputTokenBalance} ${selectedInputToken.symbol}`
      : `${outputTokenBalance} ${selectedOutputToken.symbol}`;

  return (
    <div className="relative">
      <div className="flex absolute top-[-28px] left-1 text-white/60 items-center justify-between w-full">
        <div className="flex gap-1 items-center">
          <WalletMinimalIcon height={15} width={15} />
          <span className="text-sm">{displayedBalance}</span>
        </div>

        {tokenDirection === TOKEN_DIRECTION.INPUT && (
          <InputMaxlBalanceButton balance={inputTokenBalance} />
        )}
      </div>

      <Controller
        name="amount"
        control={control}
        rules={{
          pattern: decimalsAndEmptyInputAllowed,
        }}
        render={({ field }) => (
          <input
            {...field}
            className={twMerge(
              "h-16  bg-inherit rounded-xl text-white bg-secondary-card sm:px-5 py-5 px-3  sm:text-base text-sm",
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
              const value = e.target.value;

              if (value === "" || decimalsAndEmptyInputAllowed.test(value)) {
                setValue("amount", value);
                setInputAmount(value === "" ? "" : Number(value));
              }
            }}
            disabled={tokenDirection === TOKEN_DIRECTION.OUTPUT}
            inputMode="decimal"
          />
        )}
      />
      {tokenDirection === TOKEN_DIRECTION.INPUT && (
        <span className="absolute bottom-[-28px] left-1 text-white/60">
          ${formattedUsdTotal}
        </span>
      )}
    </div>
  );
};
