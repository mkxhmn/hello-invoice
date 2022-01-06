import { FunctionComponent } from "react";
import { IGetExpensesByGroup } from "../../store/model/expense";

export const ExpenseCard: FunctionComponent<IGetExpensesByGroup> = expense => {
  return <div key={expense.id}>{expense.name}</div>;
};
