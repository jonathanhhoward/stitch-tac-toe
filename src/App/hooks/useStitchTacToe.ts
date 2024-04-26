import React from "react";
import { lilo, stitch, tie } from "../constants/players";
import { Player } from "../models/player";
import { Coordinate, State } from "../types";

export default function useStitchTacToe(initialState: () => State) {
  const [state, setState] = React.useState(initialState);

  function executeTurn(position: Coordinate): void {
    if (state.board.isOccupiedAt(position) || state.winner) {
      return;
    }

    state.player.selectSquare(state.board, position);
    const player = getNextPlayer(state.player);
    const winner = state.board.checkForWinner();

    setState({
      ...state,
      gameStatus: getGameStatus(player, winner),
      player,
      winner,
    });
  }

  function getNextPlayer(currentPlayer: Player): Player {
    return currentPlayer === stitch ? lilo : stitch;
  }

  function getGameStatus(player: Player, winner: Player | null): string {
    return winner
      ? winner === tie
        ? "Tie!"
        : `${winner.name} wins!`
      : `${player.name}'s turn`;
  }

  function startOver(): void {
    setState(initialState);
  }

  return { state, executeTurn, startOver };
}
