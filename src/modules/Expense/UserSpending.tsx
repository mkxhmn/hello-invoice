import { FunctionComponent, useMemo } from "react";
import { IUserSpending } from "./Card";

export const UserSpending: FunctionComponent<{ user: IUserSpending }> = ({
  user
}) => {
  const spending = useMemo(
    () =>
      new Intl.NumberFormat("ms-MY", {
        style: "currency",
        currency: "MYR"
      }).format(user.spending),
    [user.spending]
  );

  return (
    <div className="flex flex-row justify-between mb-1">
      <span>{user?.name}</span>
      <span className="font-medium text-red-500 ">{spending}</span>
    </div>
  );
};
