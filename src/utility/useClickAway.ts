import { RefObject, useEffect } from "react";

interface IUseClickAway {
  ref: RefObject<HTMLElement>;
  types?: (keyof DocumentEventMap)[];
}

type THandler = () => void;

export const useClickAway = (
  handler: THandler,
  { ref, types = ["mousedown", "touchstart"] }: IUseClickAway
) => {
  useEffect(() => {
    //@ts-ignore
    const handleClickAway = event => {
      if (!ref?.current?.contains(event.target)) {
        handler();
      }
    };

    types.map(type => {
      document.addEventListener(type, handleClickAway);
    });

    return () => {
      types.map(type => {
        document.removeEventListener(type, handleClickAway);
      });
    };
  }, [handler, ref, types]);
};
