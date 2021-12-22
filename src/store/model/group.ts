import { Action, action, persist } from "easy-peasy";

export interface IGroup {
  id: string; // autogenerate

  name: string;
  users: string[]; // user.id
}

export interface IGroupModel {
  groups: IGroup[];
  setGroups: Action<IGroupModel, Omit<IGroup, "id">>;
}

export const groupModel: IGroupModel = persist(
  {
    groups: [],
    setGroups: action((state, group) => {
      state.groups.push({ id: `group-${new Date().getTime()}`, ...group });
    })
  },
  {
    storage: "localStorage"
  }
);
