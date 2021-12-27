import { ChangeEvent, RefObject, useMemo, useState } from "react";
import { matchSorter } from "match-sorter";
import { useDebounce } from "use-debounce";
import { ITextField, TextField } from "../TextField";
import { Chip } from "../Chip";
import {
  IRecommendationModal,
  RecommendationModal
} from "./RecommendationModal";
import { shift, useFloating } from "@floating-ui/react-dom";
import { useClickAway } from "../../utility/useClickAway";

export interface IAutocompleteProps<T, K>
  extends Omit<ITextField, "textFieldRef">,
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

  const handleDeleteChip = (recommendation: T) => () => {
    setSelections(prevState =>
      prevState.filter(
        selection =>
          getOptionValue(selection) !== getOptionValue(recommendation)
      )
    );
  };

  const { x, y, reference, floating, strategy, refs } = useFloating({
    placement: "bottom-start",
    middleware: [shift()]
  });

  const [showModal, setShowModal] = useState(() => false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (showModal) {
      setShowModal(false);
    }
  };

  useClickAway(
    () => {
      handleCloseModal();
    },
    { ref: refs.reference as RefObject<HTMLElement> }
  );

  return (
    <div className="mb-4 relative " ref={reference}>
      <label
        className="block text-gray-700 text-sm font-bold mb-1"
        htmlFor={inputProps.id}
      >
        {label}
      </label>
      <TextField
        onChange={handleUserInput}
        inputAdornment={selections.map(selection => (
          <Chip
            key={getOptionValue(selection)}
            handleDelete={handleDeleteChip(selection)}
          >
            {getOptionLabel(selection)}
          </Chip>
        ))}
        type="text"
        onFocus={handleShowModal}
        {...inputProps}
      />
      {errors && <span className="text-sm text-red-400">{errors}</span>}
      <RecommendationModal
        show={showModal}
        modalRef={floating}
        floatingStyle={{
          position: strategy,
          top: y ?? undefined,
          left: x ?? undefined
        }}
        selections={selections}
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
