import { CSSProperties, Ref } from "react";

export interface IModal<T> {
  options: T[];
  show: boolean;
  modalStyle: CSSProperties;
  modalRef: Ref<HTMLDivElement>;

  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
}

export const Modal = <T extends object>({
  options,
  show,
  modalStyle,
  modalRef,
  getOptionLabel,
  getOptionValue
}: IModal<T>) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className=" py-2 mt-1 border-gray-50 bg-white border-2 rounded-lg shadow-md w-full "
      style={modalStyle}
      ref={modalRef}
    >
      {options.map(option => (
        <label
          key={getOptionValue(option)}
          className="flex items-center py-2 pl-3 "
        >
          <input
            type="checkbox"
            className="w-4 h-4 align-middle mx-1 border-2 "
            value={getOptionValue(option)}
          />
          {getOptionLabel(option)}
        </label>
      ))}
    </div>
  );
};
