import { IUser } from "../../store/model/user";
import { useMemo } from "react";
import { useStoreActions } from "../../store/hooks";

export interface IUserCard extends IUser {
  total: number;
  groupId: string;
  expenseId: string;
}

export const UserCard = (user: IUserCard) => {
  const setPayment = useStoreActions(actions => actions.expense.setPayment);

  const total = useMemo(() => {
    const totalPaidByUser = user.payment
      .filter(({ userId }) => userId === user.id) // array
      .reduce(
        (totalPaymentByUser, userPayment) =>
          totalPaymentByUser + userPayment.total,
        0
      ); // number

    return new Intl.NumberFormat("ms-MY", {
      style: "currency",
      currency: "MYR"
    }).format(user.total - totalPaidByUser);
  }, [user.payment, user.total, user.id]);

  const handleQuickPayment = () => {
    const result = setPayment({
      expenseId: user.expenseId,
      groupId: user.groupId,
      userId: user.id,
      total: user.total
    });

    console.log(
      "👾 %c result ",
      "background-color: #d73d32; color: white;",
      result
    );
  };

  return (
    <div key={user.id} className="flex w-full justify-between">
      <div className=" flex ml-2 flex-row items-center">
        <button
          type="button"
          className=" block relative text-center hover:bg-gray-400 bg-gray-300 text-xs rounded-full w-4 h-4"
          onClick={handleQuickPayment}
        >
          <input
            type="checkbox"
            className="absolute top-0 left-0 h-4 w-4 opacity-0"
            // checked={true}
            // onChange={props.handleDelete}
            // value={props.value}
          />
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
        <label className=" pl-2 text-gray-700 select-none">{user.name}</label>
      </div>
      <div>{total}</div>
    </div>
  );
};
