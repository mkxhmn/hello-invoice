import { FunctionComponent } from "react";

export const Chip: FunctionComponent = props => (
  <div className=" border-2 mx-0.5 flex items-center border-gray-300 rounded-xl">
    <span className="px-2 text-gray-700 ">{props.children}</span>
    <button className="mr-1 block text-center hover:bg-gray-400 bg-gray-300 text-xs rounded-2xl w-4 h-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 m-auto text-white "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);
