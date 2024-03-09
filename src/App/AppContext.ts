import React from "react";
import useStitchTacToe from "./hooks/useStitchTacToe";

const defaultValue = {} as ReturnType<typeof useStitchTacToe>;

const AppContext = React.createContext(defaultValue);

export default AppContext;
