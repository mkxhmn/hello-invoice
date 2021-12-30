import { FunctionComponent } from "react";

export const Container: FunctionComponent = ({ children }) => (
  <div className="max-w-8xl mx-auto xl:px-8 px-4 py-5 lg:px-8 sm:px-6">
    {children}
  </div>
);
