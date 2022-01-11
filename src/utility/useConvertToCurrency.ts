import { useMemo } from "react";

type TOptions = {
  locales?: string;
  style?: string;
  currency?: string;
};

export const useConvertToCurrency = (
  amount: number,
  options: TOptions = {
    locales: "ms-my",
    style: "currency",
    currency: "MYR"
  }
) => {
  return useMemo(
    () =>
      new Intl.NumberFormat(options.locales, {
        style: options.style,
        currency: options.currency
      }).format(amount),
    [amount, options]
  );
};
