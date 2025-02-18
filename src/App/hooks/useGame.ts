import { useState } from "react";
import { Game } from "../models/game";
import { Coordinate, State } from "../types";

export function useGame(initialState: () => State) {
  const [state, setState] = useState(initialState);

  function executeTurn(position: Coordinate): void {
    if (state.board.isOccupiedAt(position) || state.winner) {
      return;
    }

    state.player.selectSquare(state.board, position);
    const player = Game.nextPlayer(state.player);
    const winner = Game.checkForWinner(state.board);

    setState({
      ...state,
      status: Game.status(player, winner),
      player,
      winner,
    });
  }

  function startOver(): void {
    setState(initialState);
  }

  return { state, executeTurn, startOver };
}
