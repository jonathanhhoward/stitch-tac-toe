import { useState } from "react";
import { Coordinate } from "../models/coordinate.ts";
import { Game } from "../models/game";
import { State } from "../types";

export function useGame(initialState: () => State) {
  const [state, setState] = useState(initialState);

  function executeTurn(position: Coordinate): void {
    const game = new Game();
    const result = game.playTurn(state.board, state.player, position);

    if (!result) return;

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
