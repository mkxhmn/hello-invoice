import { FunctionComponent, InputHTMLAttributes } from "react";

export interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
}

export const TextField: FunctionComponent<ITextField> = ({
  label,
  errors,
  ...inputProps
}) => (
  <>
    <label
      className="block text-gray-700 text-sm font-bold mb-1"
      htmlFor="name"
    >
      {label}
    </label>
    <input
      className="w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
      {...inputProps}
    />
    {errors && <span className="text-sm text-red-400">{errors}</span>}
  </>
);
