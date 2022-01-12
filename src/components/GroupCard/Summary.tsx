import { IGroup } from "../../store/model/group";
import { UserAvatarGroup } from "../UserAvatarGroup";
import { useRouter } from "next/router";

export const Summary = (group: IGroup) => {
  const router = useRouter();

  const handleRouteToGroup = async () => {
    await router.push("/group/" + group.id);
  };

  return (
    <div
      onClick={handleRouteToGroup}
      className="border-2 border-black pt-1 pb-3 px-1 cursor-pointer"
    >
      <h3>{group.name}</h3>
      <UserAvatarGroup users={group.users} />
    </div>
  );
};
