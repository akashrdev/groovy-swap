import { twMerge } from "tailwind-merge";
import { TOKEN_DIRECTION, useSwap } from "@/app/context/swap";
import { getFormattedAmount } from "@/app/utils/token-amounts/get-formatted-amount";
import { scaleApiInputAmount } from "@/app/utils/token-amounts/scale-api-input-amount";
import { useGetQuote } from "@/app/hooks/use-get-quote";
import { useForm, Controller } from "react-hook-form";
import { useGetUsdPrice } from "@/app/hooks/use-get-usd-price";
import { round } from "@/app/utils/numbers/round";

const decimalsAndEmptyInputAllowed = /^\d*\.?\d*$/;

export const TokenAmountInput = ({
  tokenDirection,
}: {
  tokenDirection: TOKEN_DIRECTION;
}) => {
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

  const { control, setValue } = useForm({
    defaultValues: {
      amount: inputAmount.toString(),
    },
  });

  const { data: usdPrice } = useGetUsdPrice({
    mintAddress:
      tokenDirection === TOKEN_DIRECTION.INPUT
        ? selectedInputToken.mintAddress
        : selectedOutputToken.mintAddress,
  });

  const usdTotal = (usdPrice ?? 0) * inputAmount;

  const formattedUsdTotal = round(usdTotal);

  return (
    <div className="relative">
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
              "h-16 bg-inherit rounded-xl text-white bg-secondary-card p-5",
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
                setInputAmount(Number(value) || 0);
              }
            }}
            disabled={tokenDirection === TOKEN_DIRECTION.OUTPUT}
            inputMode="decimal"
          />
        )}
      />
      {tokenDirection === TOKEN_DIRECTION.INPUT && (
        <span className="absolute bottom-[-28px] left-0 text-white/60">
          ${formattedUsdTotal}
        </span>
      )}
    </div>
  );
};
