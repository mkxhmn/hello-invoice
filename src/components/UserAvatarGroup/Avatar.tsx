import { useStoreState } from "../../store/hooks";
import { useMemo } from "react";

export interface IAvatar {
  id: string;
}

export const Avatar = (props: IAvatar) => {
  const userById = useStoreState(state => state.user.userById(props.id));

  const user = useMemo(
    () =>
      userById.name?.includes(" ")
        ? userById.name
            ?.split(" ", 2)
            .map(name => name[0])
            .join("")
        : userById.name?.[0],
    [userById]
  );

  return (
    <div className="w-8 h-8 text-sm flex justify-center uppercase items-center -mr-2 border-2 border-white bg-gray-300 rounded-full">
      {user}
    </div>
  );
};
