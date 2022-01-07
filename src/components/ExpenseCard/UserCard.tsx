import { IUser } from "../../store/model/user";
import { useMemo } from "react";

export interface IUserCard extends IUser {
  total: number;
}

export const UserCard = (user: IUserCard) => {
  const total = useMemo(
    () =>
      new Intl.NumberFormat("ms-MY", {
        style: "currency",
        currency: "MYR"
      }).format(user.total),
    [user.total]
  );

  return (
    <div key={user.id} className="flex w-full justify-between">
      <div>{user.name}</div>
      <div>{total}</div>
    </div>
  );
};
