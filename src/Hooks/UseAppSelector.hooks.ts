import { type TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../storage/config/ConfigStorage.config";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
