import React from "react";
import { emptyPlayer, liloPlayer, stitchPlayer } from "../constants/players";
import { Board } from "../models/board";
import { Coordinate, Player, State } from "../types";

const initialState: State = {
  board: Board.create(),
  player: stitchPlayer,
  winner: emptyPlayer,
};

const getNextPlayer = (player: Player): Player =>
  player.name === "Stitch" ? liloPlayer : stitchPlayer;

export function useStitchTacToe() {
  const [state, setState] = React.useState(initialState);

  const startOver = () => setState(initialState);

  const placeToken = (position: Coordinate) =>
    setState((state) => {
      if (state.board.isSquareOccupied(position)) return state;

      const board = state.board.addPlayerToBoard(state.player, position);

      return {
        board,
        player: getNextPlayer(state.player),
        winner: board.checkForWinner(),
      };
    });

  return { state, startOver, placeToken };
}
