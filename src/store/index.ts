import { IUserModel, userModel as user } from "./model/user";
import { IGroupModel, groupModel as group } from "./model/group";
import { expenseModel as expense, IExpenseModel } from "./model/expense";
import { createStore } from "easy-peasy";

export interface IStoreModel {
  user: IUserModel;
  group: IGroupModel;
  expense: IExpenseModel;
}

export const store = createStore<IStoreModel>(
  { user, group, expense },
  {
    name: "hello-invoice"
  }
);
