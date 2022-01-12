import { Avatar } from "./Avatar";
import { motion } from "framer-motion";

export interface IUserAvatarGroup {
  users: string[];
}

export const UserAvatarGroup = (props: IUserAvatarGroup) => {
  return (
    <div className=" flex mt-1 bg-white ">
      {props.users.map((user, index) => (
        <motion.div
          initial={{
            opacity: 0.6,
            x: -16
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: index * 0.11
          }}
          key={user}
        >
          <Avatar id={user} index={index} />
        </motion.div>
      ))}
    </div>
  );
};
