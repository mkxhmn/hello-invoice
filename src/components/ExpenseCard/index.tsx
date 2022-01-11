import { FunctionComponent, useMemo } from "react";
import { IExpenseValue } from "../../store/model/expense";
import dayjs from "dayjs";
import { UserCard } from "./UserCard";
import { useConvertToCurrency } from "../../utility/useConvertToCurrency";

export const ExpenseCard: FunctionComponent<IExpenseValue> = expense => {
  const total = useConvertToCurrency(expense.total);

  const totalPaid = useMemo(
    () =>
      expense.payment.reduce(
        (totalPayment, pay) => pay.total + totalPayment,
        0
      ),
    [expense.payment]
  );

  const isSettle = useMemo(() => totalPaid >= expense.total, [
    totalPaid,
    expense.total
  ]);

  const totalPaidToCurrency = useConvertToCurrency(totalPaid);

  const date = useMemo<{ month: string; day: string }>(
    () => ({
      month: dayjs(expense.created).format("MMM"),
      day: dayjs(expense.created).format("DD")
    }),
    [expense.created]
  );

  const totalPerUser = useMemo(() => expense.total / expense.users.length, [
    expense.users,
    expense.total
  ]);

  return (
    <div
      className={` grid grid-cols-12 gap-4 py-6 px-4 rounded-lg shadow-md ${
        isSettle ? "opacity-50" : ""
      }`}
      key={expense.id}
    >
      <section className="col col-span-1">
        <h2 className=" text-xl font-extrabold text-red-500">{date.month}</h2>
        <span>{date.day}</span>
      </section>
      <section className="col col-start-2 col-end-13">
        <div className="flex w-full justify-between text-xl font-extrabold text-gray-800">
          <div className="flex">{expense.name}</div>
          <div className="flex flex-col">
            <div className="flex">{total}</div>
            {Boolean(totalPaid) && (
              <div className="flex text-sm w-full font-bold justify-end text-green-500">
                + {totalPaidToCurrency}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col">
          {expense.users.map(id => (
            <UserCard
              key={id}
              id={id}
              expenseId={expense.id as string}
              groupId={expense.groupId}
              total={totalPerUser}
              payment={expense.payment}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
