import React from "react";
import { Board } from "../board";
import { emptyPlayer, liloPlayer, stitchPlayer } from "../players";
import { Coordinate, Player, State } from "../types";

const initialState: State = {
  board: Board.create(),
  player: stitchPlayer,
  winner: emptyPlayer,
};

export function useStitchTacToe() {
  const [state, setState] = React.useState(initialState);

  function startOver() {
    setState(initialState);
  }

  function placeToken(position: Coordinate) {
    setState((state) => {
      if (state.board.isSquareOccupied(position)) return state;

      const board = state.board.addPlayerToBoard(state.player, position);

      return {
        board,
        player: getNextPlayer(state.player),
        winner: board.checkForWinner(),
      };
    });
  }

  return { state, startOver, placeToken };
}

function getNextPlayer(player: Player): Player {
  return player.name === "Stitch" ? liloPlayer : stitchPlayer;
}
