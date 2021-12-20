import { Action, action, persist } from "easy-peasy";

export interface IGroup {
  id: string; // autogenerate

  name: string;
  users: string[]; // user.id
}

export interface IGroupModel {
  groups: IGroup[];
  setGroups: Action<IGroupModel, IGroup>;
}

export const groupModel: IGroupModel = persist(
  {
    groups: [{ name: "dummy-group", id: "abc", users: [] }],
    setGroups: action((state, user) => {
      state.groups.push(user);
    })
  },
  {
    storage: "localStorage"
  }
);
