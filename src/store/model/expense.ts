import { Action, action, persist, Thunk, thunk } from "easy-peasy";
import { IStoreModel } from "../index";

interface IPaymentLogs {
  user: string;
  amount: number;
  created: string; // ISO string date
}

export interface IExpenseValue {
  id?: string;
  name: string;
  users: string[]; // user.id
  total: number;
  groupId: string;
  created: string; // ISO string date
  payment: IPaymentLogs[];
}

export interface IGetExpensesByGroup extends Omit<IExpenseValue, "groupId"> {}

export interface IExpense {
  [groupId: string]: IGetExpensesByGroup[];
}

export interface ISetExpenses
  extends Omit<IExpenseValue, "created" | "payment"> {}

export interface IExpenseModel {
  expenses: IExpense;
  setExpenses: Action<IExpenseModel, ISetExpenses>;
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

      // initialize new expenses group
      if (!state.expenses[groupId]) {
        state.expenses[groupId] = [];
      }

      state.expenses[groupId].push({
        ...expense,
        created: new Date().toISOString(),
        payment: []
      });
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
