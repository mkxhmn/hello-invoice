/**
 * [ ] user
 * [ ] group
 * [ ] expenses
 */
import { Action, action, persist, thunk, Thunk } from "easy-peasy";
import { IStoreModel } from "../index";

export interface IUser {
  id: string;
  name: string;
}

export interface IUserModel {
  users: IUser[];
  setUsers: Action<IUserModel, string>;
  getUser: Thunk<IUserModel, string, undefined, IStoreModel, IUser>;
}

export const userModel: IUserModel = persist(
  {
    users: [],
    setUsers: action((state, name) => {
      state.users.push({ name, id: `user-${new Date().getTime()}` });
    }),
    getUser: thunk((actions, userId, helpers) => {
      const user = helpers.getState().users.find(user => user.id === userId);

      if (!user) {
        return {
          id: "",
          name: ""
        };
      }

      return user;
    })
  },
  {
    storage: "localStorage"
  }
);
