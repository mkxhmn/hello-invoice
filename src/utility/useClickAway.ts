import { RefObject, useEffect } from "react";

type THandler = () => void;

export function useClickAway(
  handler: THandler,
  [ref]: RefObject<HTMLElement>[]
) {
  useEffect(() => {
    //@ts-ignore
    const handleClickAway = event => {
      if (!ref?.current?.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("touchstart", handleClickAway);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("touchstart", handleClickAway);
    };
  }, [ref, handler]);
}
