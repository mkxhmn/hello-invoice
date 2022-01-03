import { FunctionComponent } from "react";
import { ITextField, TextField } from "../TextField";
import { IModal, Modal } from "./Modal.AutoComplete";

interface IAutoComplete extends ITextField, IModal {}

export const AutoComplete: FunctionComponent<IAutoComplete> = ({
  label,
  errors,
  selections,
  ...textFieldProps
}) => {
  return (
    <div>
      <TextField label={label} errors={errors} {...textFieldProps} />

      <Modal selections={selections} />
    </div>
  );
};
