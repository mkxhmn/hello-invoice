import { ChangeEvent, CSSProperties, Ref, useMemo } from "react";

export interface IRecommendationModal<T> {
  allowCreateNew: boolean;
  floatingStyle: CSSProperties;
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => string;
  handleAddRecommendation: () => void;
  handleOptionChange: (
    recommendation: T
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  recommendations: T[];
  selections: T[];
  show: boolean;
  modalRef: Ref<HTMLDivElement>;
}

export const RecommendationModal = <T extends object>({
  allowCreateNew,
  floatingStyle,
  getOptionLabel,
  getOptionValue,
  handleAddRecommendation,
  handleOptionChange,
  recommendations,
  modalRef,
  show,
  selections
}: IRecommendationModal<T>) => {
  const selectionsValues = useMemo(() => selections.map(getOptionValue), [
    selections,
    getOptionValue
  ]);

  if (!show) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className="py-2 mt-1 border-gray-50 bg-white border-2 rounded-lg shadow-md w-full "
      style={floatingStyle}
    >
      {recommendations.map(recommendation => (
        <label
          key={getOptionValue(recommendation)}
          htmlFor={getOptionValue(recommendation)}
          className="flex items-center py-2 pl-3 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm font-medium mb-1"
        >
          <input
            type="checkbox"
            id={getOptionValue(recommendation)}
            value={getOptionValue(recommendation)}
            className="w-4 h-4 align-middle mx-1 border-2 "
            //@ts-ignore
            onChange={handleOptionChange(recommendation)}
            checked={selectionsValues.includes(getOptionValue(recommendation))}
          />
          {getOptionLabel(recommendation)}
        </label>
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
