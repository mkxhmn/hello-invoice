export interface ISelections {
  label: string;
  value: number;
}

export interface IModal {
  selections: ISelections[];
  show: boolean;
}

export function Modal({ selections, show }: IModal) {
  return (
    <div className=" py-2 mt-1 border-gray-50 bg-white border-2 rounded-lg shadow-md w-full ">
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
  );
}
