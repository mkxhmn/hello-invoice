export interface ISelections {
  label: string;
  value: number;
}

export interface IModal {
  selections: ISelections[];
}

export function Modal({ selections }: IModal) {
  return (
    <div className=" border-black border-2 ">
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
