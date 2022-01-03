import { RefObject, useState } from "react";
import { ITextField, TextField } from "../TextField";
import { Modal } from "./Modal.AutoComplete";
import { shift, useFloating } from "@floating-ui/react-dom";
import { useClickAway } from "../../utility/useClickAway";

interface IAutoComplete<T> extends ITextField {
  options: T[];
}

export const AutoComplete = <T extends object>({
  label,
  errors,
  options,
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

  return (
    <div ref={reference} className=" relative ">
      <TextField
        onFocus={handleShowModal}
        label={label}
        errors={errors}
        {...textFieldProps}
      />
      <Modal
        options={options}
        show={showModal}
        modalStyle={{
          left: x ?? undefined,
          top: y ?? undefined,
          position: strategy
        }}
        modalRef={floating}
      />
    </div>
  );
};
