import { IGroup } from "../../store/model/group";
import { UserAvatarGroup } from "../UserAvatarGroup";

export const Summary = (group: IGroup) => {
  return (
    <div className="border-2 border-black pt-1 pb-3 px-1">
      <h2>{group.name}</h2>
      <UserAvatarGroup users={group.users} />
    </div>
  );
};
