import { ChangeEvent } from "react";

export interface IRecommendationModal<T> {
  allowCreateNew: boolean;
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => string;
  handleAddRecommendation: () => void;
  handleOptionChange: (
    recommendation: T
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  recommendations: T[];
}

export const RecommendationModal = <T extends object>({
  allowCreateNew,
  getOptionLabel,
  getOptionValue,
  handleAddRecommendation,
  handleOptionChange,
  recommendations
}: IRecommendationModal<T>) => {
  return (
    <div className="border-gray-800 border-2">
      {recommendations.map(recommendation => (
        <div
          key={getOptionValue(recommendation)}
          className="mt-2 align-center flex"
        >
          <input
            type="checkbox"
            id={getOptionValue(recommendation)}
            value={getOptionValue(recommendation)}
            className="w-4 h-4"
            //@ts-ignore
            onChange={handleOptionChange(recommendation)}
          />
          <label
            htmlFor={getOptionValue(recommendation)}
            className="text-gray-700 text-sm ml-1 font-bold mb-1"
          >
            {getOptionLabel(recommendation)}
          </label>
        </div>
      ))}
      {allowCreateNew && !recommendations.length && (
        <button
          className="text-blue-400"
          type="button"
          onClick={handleAddRecommendation}
        >
          Add
        </button>
      )}
    </div>
  );
};
