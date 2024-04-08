import React from "react";
import { lilo, stitch, tie } from "../constants/players";
import { Coordinate, State } from "../types";

export default function useStitchTacToe(initialState: () => State) {
  const [state, setState] = React.useState(initialState);

  function executeTurn(position: Coordinate) {
    if (state.board.isOccupiedAt(position) || state.winner) {
      return;
    }

    setState(({ board, player: prevPlayer }): State => {
      prevPlayer.placeToken(board, position);
      const player = getPlayer();
      const winner = board.checkForWinner();
      const gameStatus = getGameStatus();

      return { board, gameStatus, player, winner };

      ///////////////////////////////////////////////////////////////////

      function getPlayer() {
        return prevPlayer === stitch ? lilo : stitch;
      }

      function getGameStatus() {
        return winner
          ? winner === tie
            ? "Tie!"
            : `${winner.token.name} wins!`
          : `${player.token.name}'s turn`;
      }
    });
  }

  function startOver() {
    setState(initialState);
  }

  return { state, executeTurn, startOver };
}
