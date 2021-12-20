import { Action, action, persist } from "easy-peasy";

export interface IExpense {
  id: string;
  name: string;
  users: string[]; // user.id
  total: number;
  groupId: string;
}

export interface IExpenseModel {
  expenses: IExpense[];
  setExpenses: Action<IExpenseModel, IExpense>;
}

export const expenseModel: IExpenseModel = persist(
  {
    expenses: [],
    setExpenses: action((state, expense) => {
      state.expenses.push(expense);
    })
  },
  {
    storage: "localStorage"
  }
);
