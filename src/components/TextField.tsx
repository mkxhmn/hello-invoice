import { FunctionComponent, InputHTMLAttributes, ReactNode } from "react";

export interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
  inputAdornment?: ReactNode;
}

export const TextField: FunctionComponent<ITextField> = ({
  label,
  errors,
  inputAdornment,
  ...inputProps
}) => (
  <>
    <label
      className="block text-gray-700 text-sm font-bold mb-1"
      htmlFor="name"
    >
      {label}
    </label>
    <div className=" w-full py-2 flex flex-row px-3 rounded-lg shadow-md ">
      {inputAdornment && <span>{inputAdornment}</span>}
      <input
        className="w-full flex flex-1 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white sm:text-sm"
        {...inputProps}
      />
    </div>
    {errors && <span className="text-sm text-red-400">{errors}</span>}
  </>
);
