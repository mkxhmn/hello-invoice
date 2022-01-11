import { Avatar } from "./Avatar";

interface IUserAvatarGroup {
  users: string[];
}

export const UserAvatarGroup = (props: IUserAvatarGroup) => {
  return (
    <div className=" flex mb-8 mt-1 ">
      {props.users.map(user => (
        <Avatar id={user} key={user} />
      ))}
    </div>
  );
};
