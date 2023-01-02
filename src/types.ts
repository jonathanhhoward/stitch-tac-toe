import React from "react";

export interface State {
  board: string[][];
  player: string;
  winner: string;
}

export interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}
