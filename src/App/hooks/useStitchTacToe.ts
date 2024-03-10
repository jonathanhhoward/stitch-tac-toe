import React from "react";
import { initialState } from "../constants/initialState";
import { liloPlayer, stitchPlayer } from "../constants/players";
import { Coordinate } from "../types";

export default function useStitchTacToe(init = initialState) {
  const [state, setState] = React.useState(init);

  function startOver() {
    setState(init);
  }

  function placeToken(position: Coordinate) {
    setState(({ board: prevBoard, player: prevPlayer }) => {
      if (prevBoard.isOccupiedAt(position)) return state;

      const board = prevBoard.add(prevPlayer, position);
      const player = prevPlayer.name === "Stitch" ? liloPlayer : stitchPlayer;
      const winner = board.checkForWinner();

      return { board, player, winner };
    });
  }

  return { state, startOver, placeToken };
}
