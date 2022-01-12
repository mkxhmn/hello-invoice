import { useConvertToCurrency } from "../../utility/useConvertToCurrency";

interface ITotalSummary {
  header: string;
  total: number;
}

export function TotalSummary({ header, total }: ITotalSummary) {
  const totalInCurrency = useConvertToCurrency(total);

  return (
    <div className="text-md flex flex-col">
      <div className="flex justify-center text-gray-700">{header}</div>
      <div className="flex justify-center text-gray-800 font-medium">
        {totalInCurrency}
      </div>
    </div>
  );
}
