import { useState } from "react";
import { Coordinate } from "../models/coordinate.ts";
import { GameTurn } from "../models/gameTurn.ts";
import { State } from "../types";

export function useGame(initialState: () => State) {
  const [state, setState] = useState(initialState);

  function executeTurn(position: Coordinate): void {
    const turn = new GameTurn(state.board, state.player, position);
    const result = turn.result();

    if (!result.changed) return;

    setState({
      board: result.board,
      status: result.status,
      player: result.nextPlayer,
      winner: result.winner,
    });
  }

  function startOver(): void {
    setState(initialState);
  }

  return { state, executeTurn, startOver };
}
