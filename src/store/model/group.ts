import { Action, action, persist } from "easy-peasy";

export interface IGroup {
  id?: string; // autogenerate

  name: string;
  users: string[]; // user.id
}

export interface IGroupModel {
  groups: IGroup[];
  setGroups: Action<IGroupModel, IGroup>;
}

export const groupModel: IGroupModel = persist(
  {
    groups: [],
    setGroups: action((state, group) => {
      group["id"] = `group-${new Date().getTime()}`;
      state.groups.push(group);
    })
  },
  {
    storage: "localStorage"
  }
);
