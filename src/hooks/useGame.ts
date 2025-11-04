import { useState } from "react";
import { Coordinate } from "../models/coordinate.ts";
import { Game } from "../models/game";
import { State } from "../types";

export function useGame(initialState: () => State) {
  const [state, setState] = useState(initialState);

  function executeTurn(position: Coordinate): void {
    if (state.board.isOccupiedAt(position) || state.winner) {
      return;
    }

    const board = state.player.selectSquare(state.board, position);
    const game = new Game();
    const player = game.nextPlayer(state.player);
    const winner = game.checkForWinner(board);
    const status = game.status(player, winner);

    setState({ board, status, player, winner });
  }

  function startOver(): void {
    setState(initialState);
  }

  return { state, executeTurn, startOver };
}
