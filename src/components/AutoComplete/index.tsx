import { ChangeEvent, RefObject, useState } from "react";
import { ITextField, TextField } from "../TextField";
import { IModal, Modal } from "./Modal.AutoComplete";
import { shift, useFloating } from "@floating-ui/react-dom";
import { useClickAway } from "../../utility/useClickAway";
import { Chip } from "../Chip";

interface IAutoComplete<T>
  extends ITextField,
    Pick<IModal<T>, "getOptionLabel" | "getOptionValue"> {
  options: T[];
}

export const AutoComplete = <T extends object>({
  label,
  errors,
  options,

  getOptionLabel,
  getOptionValue,
  ...textFieldProps
}: IAutoComplete<T>) => {
  const { x, y, reference, floating, strategy, refs } = useFloating({
    placement: "bottom-start",
    middleware: [shift()]
  });

  const [showModal, setShowModal] = useState(() => false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useClickAway(() => {
    handleCloseModal();
  }, [refs.reference as RefObject<HTMLElement>]);

  const [selections, setSelections] = useState<T[]>(() => []);

  const handleOptionChange = (selection: T) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setSelections(prevState => [selection, ...prevState]);
    } else {
      setSelections(prevState =>
        prevState.filter(
          prevSelection =>
            getOptionValue(prevSelection) !== getOptionValue(selection)
        )
      );
    }
  };

  return (
    <div ref={reference} className=" relative ">
      <TextField
        onFocus={handleShowModal}
        label={label}
        errors={errors}
        inputAdornment={selections.map(selection => (
          <Chip
            handleDelete={handleOptionChange(selection)}
            key={getOptionValue(selection)}
            value={getOptionValue(selection)}
          >
            {getOptionLabel(selection)}
          </Chip>
        ))}
        {...textFieldProps}
      />
      <Modal
        selections={selections}
        options={options}
        show={showModal}
        modalStyle={{
          left: x ?? undefined,
          top: y ?? undefined,
          position: strategy
        }}
        modalRef={floating}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        handleOptionChange={handleOptionChange}
      />
    </div>
  );
};
