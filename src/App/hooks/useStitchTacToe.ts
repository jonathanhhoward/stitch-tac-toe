import React from "react";
import { emptyPlayer, liloPlayer, stitchPlayer } from "../constants/players";
import Board from "../models/board";
import { Coordinate, Player, State } from "../types";

const initialState: State = {
  board: Board.create(),
  player: stitchPlayer,
  winner: emptyPlayer,
};

function getNextPlayer(player: Player): Player {
  return player.name === "Stitch" ? liloPlayer : stitchPlayer;
}

export default function useStitchTacToe() {
  const [state, setState] = React.useState(initialState);

  function startOver() {
    setState(initialState);
  }

  function placeToken(position: Coordinate) {
    setState(({ board: prevBoard, player: prevPlayer }) => {
      if (prevBoard.isOccupiedAt(position)) return state;

      const board = prevBoard.add(prevPlayer, position);
      const player = getNextPlayer(prevPlayer);
      const winner = board.checkForWinner();

      return { board, player, winner };
    });
  }

  return { state, startOver, placeToken };
}
