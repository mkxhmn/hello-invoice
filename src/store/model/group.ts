import {
  Action,
  action,
  computed,
  Computed,
  persist,
  thunk,
  Thunk
} from "easy-peasy";
import { IStoreModel } from "../index";
import { IUser } from "./user";
import { IGetExpensesByGroup } from "./expense";

export interface IGroup {
  id?: string; // autogenerate

  name: string;
  users: string[]; // user.id
}

export interface IGetGroup extends Omit<IGroup, "users"> {
  users: (IUser | undefined)[];
  expenses: IGetExpensesByGroup[];
}

export interface IGroupModel {
  groups: IGroup[];
  setGroups: Action<IGroupModel, IGroup>;
  getGroup: Thunk<IGroupModel, string, undefined, IStoreModel, IGetGroup>;
  groupById: Computed<IGroupModel, (id: string) => IGroup>;
}

export const groupModel: IGroupModel = persist(
  {
    groups: [],
    groupById: computed(state => id =>
      state.groups.find(group => group.id === id) ?? {
        id: "",
        name: "",
        users: []
      }
    ),
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
          users: [],
          expenses: []
        };
      }

      const users = group.users.map(userId =>
        helpers.getStoreActions().user.getUser(userId)
      );
      const expenses = helpers
        .getStoreActions()
        .expense.getExpenseByGroup(groupId);

      return {
        ...group,
        users,
        expenses
      };
    })
  },
  {
    storage: "localStorage"
  }
);
