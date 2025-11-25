import { useState } from "react";
import { Coordinate } from "../models/coordinate.ts";
import { GameTurn } from "../models/gameTurn.ts";
import { State } from "../types";

export function useTurnState(initialState: () => State) {
  const [state, setState] = useState(initialState);

  function executeTurn(position: Coordinate): void {
    const gameTurn = new GameTurn(state, position);

    setState(gameTurn.result());
  }

  function startOver(): void {
    setState(initialState);
  }

  return { state, executeTurn, startOver };
}
