import { FunctionComponent, RefObject, useState } from "react";
import { ITextField, TextField } from "../TextField";
import { IModal, Modal } from "./Modal.AutoComplete";
import { shift, useFloating } from "@floating-ui/react-dom";
import { useClickAway } from "../../utility/useClickAway";

interface IAutoComplete extends ITextField, IModal {}

export const AutoComplete: FunctionComponent<IAutoComplete> = ({
  label,
  errors,
  selections,
  ...textFieldProps
}) => {
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
        selections={selections}
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
