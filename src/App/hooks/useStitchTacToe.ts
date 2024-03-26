import React from "react";
import {
  emptyPlayer,
  liloPlayer,
  stitchPlayer,
  tiePlayer,
} from "../constants/players";
import { Coordinate, State } from "../types";

export default function useStitchTacToe(initialState: State) {
  const [state, setState] = React.useState(initialState);

  function placeToken(position: Coordinate) {
    setState(({ board: prevBoard, player: prevPlayer, winner: prevWinner }) => {
      if (prevBoard.isOccupiedAt(position) || prevWinner !== emptyPlayer) {
        return state;
      }

      const board = prevBoard.add(prevPlayer, position);
      const player = getPlayer();
      const winner = board.checkForWinner();
      const gameStatus = getGameStatus();

      return { board, gameStatus, player, winner };

      ///////////////////////////////////////////////////////////////////

      function getPlayer() {
        return prevPlayer === stitchPlayer ? liloPlayer : stitchPlayer;
      }

      function getGameStatus() {
        return winner === emptyPlayer
          ? `${player.name}'s turn`
          : winner === tiePlayer
            ? "Tie!"
            : `${winner.name} wins!`;
      }
    });
  }

  function startOver() {
    setState(initialState);
  }

  return { state, placeToken, startOver };
}
