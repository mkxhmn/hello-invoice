import { FunctionComponent } from "react";
import { ITextField, TextField } from "../TextField";

interface IAutoComplete extends ITextField {}

export const AutoComplete: FunctionComponent<IAutoComplete> = ({
  label,
  errors,
  ...textFieldProps
}) => {
  return (
    <div>
      <TextField label={label} errors={errors} {...textFieldProps} />
    </div>
  );
};
