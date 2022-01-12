import { Avatar } from "./Avatar";

export interface IUserAvatarGroup {
  users: string[];
}

export const UserAvatarGroup = (props: IUserAvatarGroup) => {
  return (
    <div className=" flex mt-1 bg-white ">
      {props.users.map((user, index) => (
        <Avatar id={user} key={user} index={index} />
      ))}
    </div>
  );
};
