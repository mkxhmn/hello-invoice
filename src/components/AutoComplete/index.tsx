import { FunctionComponent } from "react";
import { ITextField, TextField } from "../TextField";

interface IAutoComplete extends ITextField {
  selections: { label: string; value: number }[];
}

export const AutoComplete: FunctionComponent<IAutoComplete> = ({
  label,
  errors,
  selections,
  ...textFieldProps
}) => {
  return (
    <div>
      <TextField label={label} errors={errors} {...textFieldProps} />

      <div
        id="ni-modal-jangan-nak-pandai-pandai"
        className=" border-black border-2 "
      >
        {selections.map(({ value, label }) => (
          <label key={value} className="flex items-center py-2 pl-3 ">
            <input
              type="checkbox"
              className="w-4 h-4 align-middle mx-1 border-2 "
              value={value}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};
