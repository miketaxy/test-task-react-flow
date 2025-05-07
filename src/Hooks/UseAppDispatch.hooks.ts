import { useDispatch } from "react-redux";
import type { AppDispatch } from "../storage/config/ConfigStorage.config";

export const useAppDispatch = () => useDispatch<AppDispatch>();
