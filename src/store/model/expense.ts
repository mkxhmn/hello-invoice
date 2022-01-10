import {
  Action,
  action,
  computed,
  Computed,
  persist,
  Thunk,
  thunk
} from "easy-peasy";
import { IStoreModel } from "../index";

interface ISetPayment {
  total: number;
  created: string; // ISO string date
  id: string;

  // reference
  userId: string;
  expenseId: string;
  groupId: string;
}

interface IPayment extends Omit<ISetPayment, "groupId" | "expenseId"> {}

export interface IExpenseValue {
  id?: string;
  name: string;
  users: string[]; // user.id
  total: number;
  groupId: string;
  created: string; // ISO string date
  payment: IPayment[];
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
  setPayment: Thunk<
    IExpenseModel,
    Pick<ISetPayment, "expenseId" | "groupId" | "total" | "userId">,
    undefined,
    IStoreModel,
    IPayment[]
  >;
  setPaymentWithGroupIdByExpenseId: Action<IExpenseModel, ISetPayment>;
  expenseByGroupId: Computed<
    IExpenseModel,
    (groupId: string) => IGetExpensesByGroup[]
  >;
}

export const expenseModel: IExpenseModel = persist(
  {
    expenses: {},
    expenseByGroupId: computed(state => groupId =>
      state.expenses?.[groupId] ?? []
    ),
    setPayment: thunk((actions, payload, helpers) => {
      const { setPaymentWithGroupIdByExpenseId } = actions;

      setPaymentWithGroupIdByExpenseId({
        id: `payment-${new Date().getTime()}`,
        created: new Date().toISOString(),
        ...payload
      });

      return (
        helpers
          .getState()
          .expenses[payload.groupId]?.find(
            expense => expense.id === payload.expenseId
          )?.payment ?? []
      );
    }),
    setPaymentWithGroupIdByExpenseId: action(
      (state, { groupId, expenseId, ...payment }) => {
        state.expenses[groupId]
          .find(expense => expense.id === expenseId)
          ?.payment.push(payment);
      }
    ),
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
