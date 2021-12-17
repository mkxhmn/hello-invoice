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
  setUsers: Action<IUserModel, IUser>;
}

export const userModel: IUserModel = persist(
  {
    users: [],
    setUsers: action((state, user) => {
      state.users.push(user);
    })
  },
  {
    storage: "localStorage"
  }
);
