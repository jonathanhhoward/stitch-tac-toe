import React from "react";
import { liloPlayer, stitchPlayer } from "../constants/players";
import { Coordinate, State } from "../types";

export default function useStitchTacToe(initialState: State) {
  const [state, setState] = React.useState(initialState);

  function startOver() {
    setState(initialState);
  }

  function placeToken(position: Coordinate) {
    setState(({ board: prevBoard, player: prevPlayer }) => {
      if (prevBoard.isOccupiedAt(position) || state.winner.name) return state;

      const board = prevBoard.add(prevPlayer, position);
      const player = prevPlayer.name === "Stitch" ? liloPlayer : stitchPlayer;
      const winner = board.checkForWinner();
      const gameStatus = winner.name
        ? winner.name === "Tie"
          ? "Tie!"
          : `${winner.name} wins!`
        : `${player.name}'s turn`;

      return { board, gameStatus, player, winner };
    });
  }

  return { state, placeToken, startOver };
}
