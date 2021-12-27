import { ChangeEvent, useMemo, useState } from "react";
import { matchSorter } from "match-sorter";
import { useDebounce } from "use-debounce";
import { ITextField, TextField } from "../TextField";
import { Chip } from "../Chip";
import {
  IRecommendationModal,
  RecommendationModal
} from "./RecommendationModal";

export interface IAutocompleteProps<T, K>
  extends ITextField,
    Pick<IRecommendationModal<T>, "getOptionLabel" | "getOptionValue"> {
  createNewRecommendation?: (recommendation: string) => void;
  errors?: string;
  filterBy: K;
  label: string;
  options: T[];
  handleChange: (
    recommendation: T,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

export const AutoComplete = <T extends object, K extends keyof T>({
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
  const recommendations = useMemo<T[]>(() => {
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
      <RecommendationModal
        allowCreateNew={Boolean(createNewRecommendation)}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        handleAddRecommendation={handleAddRecommendation}
        handleOptionChange={handleOptionChange}
        recommendations={recommendations}
      />
    </div>
  );
};
