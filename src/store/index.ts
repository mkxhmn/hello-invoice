import { IUserModel, userModel as user } from "./model/user";
import { createStore } from "easy-peasy";

export interface IStoreModel {
  user: IUserModel;
}

export const store = createStore<IStoreModel>(
  { user },
  {
    name: "hello-invoice"
  }
);
