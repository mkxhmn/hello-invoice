import { ChangeEvent, useMemo, useState } from "react";
import { matchSorter } from "match-sorter";
import { useDebounce } from "use-debounce";
import { ITextField, TextField } from "../TextField";
import { Chip } from "../Chip";

export interface IAutocompleteProps<T, K> extends ITextField {
  options: T[];
  handleChange: (
    recommendation: T,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  errors?: string;
  createNewRecommendation?: (recommendation: string) => void;
  getOptionValue: (item: T) => string;
  getOptionLabel: (item: T) => string;
  label: string;
  filterBy: K | string;
}

export const AutoComplete = <T extends unknown, K extends keyof T>({
  options,
  handleChange,
  errors,
  createNewRecommendation,
  getOptionValue,
  getOptionLabel,
  label,
  filterBy,
  ...inputProps
}: IAutocompleteProps<T, K>) => {
  const [userInput, setUserInput] = useState(() => "");

  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const [debounceInput] = useDebounce(userInput, 250);
  const recommendations = useMemo(() => {
    if (!debounceInput) {
      return options;
    }

    return matchSorter(options, debounceInput, {
      keys: [filterBy as string]
    });
  }, [options, debounceInput, filterBy]);

  const handleAddRecommendation = () => {
    if (createNewRecommendation) {
      createNewRecommendation(userInput);
    }
  };

  const [selections, setSelections] = useState<T[]>(() => []);

  const handleOptionChange = (recommendation: T) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setSelections(prevState => [...prevState, recommendation]);
    } else {
      setSelections(prevState =>
        prevState.filter(
          selection =>
            getOptionValue(selection) !== getOptionValue(recommendation)
        )
      );
    }

    handleChange(recommendation, event);
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-1"
        htmlFor={inputProps.id}
      >
        {label}
      </label>
      <TextField
        onChange={handleUserInput}
        inputAdornment={selections.map(selection => (
          <Chip key={getOptionValue(selection)}>
            {getOptionLabel(selection)}
          </Chip>
        ))}
        type="text"
        {...inputProps}
      />
      {errors && <span className="text-sm text-red-400">{errors}</span>}
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
        {createNewRecommendation && !recommendations.length && (
          <button
            className="text-blue-400"
            type="button"
            onClick={handleAddRecommendation}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};
