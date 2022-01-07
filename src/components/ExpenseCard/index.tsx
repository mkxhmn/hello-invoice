import { FunctionComponent, useMemo } from "react";
import { IGetExpensesByGroup } from "../../store/model/expense";
import dayjs from "dayjs";
import { useStoreActions } from "../../store/hooks";
import { IUserCard, UserCard } from "./UserCard";

export const ExpenseCard: FunctionComponent<IGetExpensesByGroup> = expense => {
  const total = useMemo(
    () =>
      new Intl.NumberFormat("ms-MY", {
        style: "currency",
        currency: "MYR"
      }).format(expense.total),
    [expense.total]
  );

  const getUser = useStoreActions(actions => actions.user.getUser);

  const date = useMemo<{ month: string; day: string }>(
    () => ({
      month: dayjs(expense.created).format("MMM"),
      day: dayjs(expense.created).format("DD")
    }),
    [expense.created]
  );

  const users = useMemo<IUserCard[]>(
    () =>
      expense.users.map(userId => ({
        ...getUser(userId),
        total: expense.total / expense.users.length
      })),
    [expense.users, expense.total, getUser]
  );

  return (
    <div
      className=" grid grid-cols-12 gap-4 py-6 px-4 rounded-lg shadow-md "
      key={expense.id}
    >
      <section className="col col-span-1">
        <h2 className=" text-xl font-extrabold text-red-500">{date.month}</h2>
        <span>{date.day}</span>
      </section>
      <section className="col col-start-2 col-end-13">
        <div className="flex w-full justify-between text-xl font-extrabold text-gray-800">
          <div className="flex">{expense.name}</div>
          <div className="flex">{total}</div>
        </div>
        <div className="flex w-full flex-col">
          {users.map(user => (
            <UserCard {...user} key={user.id} />
          ))}
        </div>
      </section>
    </div>
  );
};
