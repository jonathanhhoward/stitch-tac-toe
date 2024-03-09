import React from "react";
import { useStitchTacToe } from "./hooks/useStitchTacToe";

const defaultValue = {} as ReturnType<typeof useStitchTacToe>;

export const AppContext = React.createContext(defaultValue);
