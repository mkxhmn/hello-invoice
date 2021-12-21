/**
 * [ ] user
 * [ ] group
 * [ ] expenses
 */
import { Action, action, persist } from "easy-peasy";

export interface IUser {
  id: string;
  name: string;
}

export interface IUserModel {
  users: IUser[];
  setUsers: Action<IUserModel, string>;
}

export const userModel: IUserModel = persist(
  {
    users: [],
    setUsers: action((state, name) => {
      state.users.push({ name, id: `user-${new Date().getTime()}` });
    })
  },
  {
    storage: "localStorage"
  }
);
