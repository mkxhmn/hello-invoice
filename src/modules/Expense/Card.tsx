import { FunctionComponent, useMemo } from "react";
import { IGetExpensesByGroup } from "../../store/model/expense";
import { useStoreActions } from "../../store/hooks";
import dayjs from "dayjs";
import { IUser } from "../../store/model/user";
import { UserSpending } from "./UserSpending";

export interface IUserSpending extends IUser {
  spending: number;
}

export const Card: FunctionComponent<{ expense: IGetExpensesByGroup }> = ({
  expense
}) => {
  const date = useMemo<{ date: string; month: string }>(
    () => ({
      date: dayjs(expense.created).format("DD"),
      month: dayjs(expense.created).format("MMM")
    }),
    [expense.created]
  );

  const getUser = useStoreActions(actions => actions.user.getUser);

  const users = useMemo<IUserSpending[]>(
    () =>
      expense.users.map(id => ({
        spending: expense.total / expense.users.length,
        ...getUser(id)
      })),
    [expense.users, getUser, expense.total]
  );

  const total = useMemo(
    () =>
      new Intl.NumberFormat("ms-MY", {
        style: "currency",
        currency: "MYR"
      }).format(expense.total),
    [expense.total]
  );

  return (
    <div
      className=" py-2 flex flex-row pr-4 rounded-lg shadow-md mb-4"
      key={expense.id}
    >
      <section
        aria-describedby="date"
        className="flex flex-col text-gray-400 text-center w-16 mr-2"
      >
        <h2 className="text-xl">{date.date}</h2>
        <span>{date.month}</span>
      </section>
      <section aria-describedby="card-header" className="flex flex-col w-full">
        <div className="flex flex-row justify-between w-full items-center mb-2 ">
          <h2 className="text-xl font-extrabold text-gray-800 ">
            {expense.name}
          </h2>
          <h2 className="text-xl font-extrabold text-green-500 ">{total}</h2>
        </div>
        <section aria-describedby="users" className=" flex flex-col">
          {users.map(user => (
            <UserSpending key={user.id} user={user} />
          ))}
        </section>
      </section>
    </div>
  );
};
