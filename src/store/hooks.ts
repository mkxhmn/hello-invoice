import { createTypedHooks } from "easy-peasy";
import { IStoreModel } from "./index";

const typedHooks = createTypedHooks<IStoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStore = typedHooks.useStore;
