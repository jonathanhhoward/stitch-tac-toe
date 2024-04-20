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

    state.player.placeToken(state.board, position);
    const player = getPlayer();
    const winner = state.board.checkForWinner();

    setState({
      board: state.board,
      gameStatus: getGameStatus(player, winner),
      player,
      winner,
    });
  }

  function getPlayer(): Player {
    return state.player === stitch ? lilo : stitch;
  }

  function getGameStatus(player: Player, winner: Player | null): string {
    return winner
      ? winner === tie
        ? "Tie!"
        : `${winner.token.name} wins!`
      : `${player.token.name}'s turn`;
  }

  function startOver(): void {
    setState(initialState);
  }

  return { state, executeTurn, startOver };
}
