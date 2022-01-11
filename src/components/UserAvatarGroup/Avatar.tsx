import { useStoreState } from "../../store/hooks";
import { useMemo } from "react";

export interface IAvatar {
  id: string;
  index: number;
}

const palettes = ["#001219ff", "#0a9396ff", "#e63946"];

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

  const backgroundColor = useMemo(
    () => palettes[props.index % palettes.length],
    [props.index]
  );

  return (
    <div
      style={{
        backgroundColor
      }}
      className="w-8 h-8 text-sm flex justify-center uppercase items-center -mr-2 border-2 border-white text-white rounded-full font-medium"
    >
      {user}
    </div>
  );
};
