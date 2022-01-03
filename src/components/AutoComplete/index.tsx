import { FunctionComponent, useState } from "react";
import { ITextField, TextField } from "../TextField";
import { IModal, Modal } from "./Modal.AutoComplete";
import { shift, useFloating } from "@floating-ui/react-dom";

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

  return (
    <div ref={reference} className=" relative ">
      <TextField
        onFocus={handleShowModal}
        label={label}
        errors={errors}
        {...textFieldProps}
      />
      {showModal && (
        <div
          className="w-full"
          ref={floating}
          style={{
            left: x ?? undefined,
            top: y ?? undefined,
            position: strategy
          }}
        >
          <Modal selections={selections} show={showModal} />
        </div>
      )}
    </div>
  );
};
