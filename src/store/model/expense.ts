import { Action, action, persist, Thunk, thunk } from "easy-peasy";
import { IStoreModel } from "../index";

export interface IExpenseValue {
  id?: string;
  name: string;
  users: string[]; // user.id
  total: number;
  groupId: string;
}

export interface IGetExpensesByGroup extends Omit<IExpenseValue, "groupId"> {}

export interface IExpense {
  [groupId: string]: IGetExpensesByGroup[];
}

export interface IExpenseModel {
  expenses: IExpense;
  setExpenses: Action<IExpenseModel, IExpenseValue>;
  getExpenseByGroup: Thunk<
    IExpenseModel,
    string,
    undefined,
    IStoreModel,
    IGetExpensesByGroup[]
  >;
}

export const expenseModel: IExpenseModel = persist(
  {
    expenses: {},
    setExpenses: action((state, { groupId, ...expense }) => {
      expense["id"] = `expense-${new Date().getTime()}`;
      state.expenses[groupId].push(expense);
    }),
    getExpenseByGroup: thunk((actions, groupId, helpers) => {
      const expenseByGroup = helpers.getState().expenses?.[groupId];

      if (!expenseByGroup) {
        return [];
      }

      return expenseByGroup;
    })
  },
  {
    storage: "localStorage"
  }
);
