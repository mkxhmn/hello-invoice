import { ButtonHTMLAttributes, FunctionComponent } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonColor?:
    | "white"
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
}

export const Button: FunctionComponent<IButton> = ({
  children,
  buttonColor = "white",
  ...buttonProps
}) => (
  <button
    type="submit"
    className={`bg-${buttonColor}-600 text-gray-100 py-2 px-4 rounded-lg shadow-md`}
    {...buttonProps}
  >
    {children}
  </button>
);
