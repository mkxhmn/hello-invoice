import { Action, action, persist, thunk, Thunk } from "easy-peasy";
import { IStoreModel } from "../index";
import { IUser } from "./user";

export interface IGroup {
  id?: string; // autogenerate

  name: string;
  users: string[]; // user.id
}

export interface IGetGroup extends Omit<IGroup, "users"> {
  users: (IUser | undefined)[];
}

export interface IGroupModel {
  groups: IGroup[];
  setGroups: Action<IGroupModel, IGroup>;
  getGroup: Thunk<IGroupModel, string, undefined, IStoreModel, IGetGroup>;
}

export const groupModel: IGroupModel = persist(
  {
    groups: [],
    setGroups: action((state, group) => {
      group["id"] = `group-${new Date().getTime()}`;
      state.groups.push(group);
    }),
    getGroup: thunk((actions, groupId, helpers) => {
      const group = helpers
        .getState()
        .groups.find(group => group.id === groupId);

      if (!group) {
        return {
          id: "",
          name: "",
          users: []
        };
      }

      const users = group.users.map(userId =>
        helpers.getStoreActions().user.getUser(userId)
      );

      return {
        ...group,
        users
      };
    })
  },
  {
    storage: "localStorage"
  }
);
