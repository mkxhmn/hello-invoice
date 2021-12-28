import { Action, action, persist, Thunk, thunk } from "easy-peasy";
import { IStoreModel } from "../index";

interface IExpenseUser {
  id: string;
  paid: boolean;
  paidDate?: string; // ISO string date
}

export interface IExpenseValue {
  id?: string;
  name: string;
  users: IExpenseUser[]; // user.id
  total: number;
  groupId: string;
  created: string; // ISO string date
}

export interface IGetExpensesByGroup extends Omit<IExpenseValue, "groupId"> {}

export interface IExpense {
  [groupId: string]: IGetExpensesByGroup[];
}

export interface ISetExpenses extends Omit<IExpenseValue, "created" | "users"> {
  users: string[];
}

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
    setExpenses: action((state, { groupId, users, ...expense }) => {
      expense["id"] = `expense-${new Date().getTime()}`;

      // initialize new expenses group
      if (!state.expenses[groupId]) {
        state.expenses[groupId] = [];
      }

      state.expenses[groupId].push({
        ...expense,
        users: users.map(id => ({ id, paid: false })),
        created: new Date().toISOString()
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
