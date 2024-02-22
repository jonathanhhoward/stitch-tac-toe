import { createContext } from "react";
import { useStitchTacToe } from "./hooks/useStitchTacToe";

const defaultValue = {} as ReturnType<typeof useStitchTacToe>;

export const AppContext = createContext(defaultValue);
