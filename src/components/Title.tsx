import { FunctionComponent } from "react";

export const Title: FunctionComponent = ({ children }) => (
  <h1 className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
    {children}
  </h1>
);
