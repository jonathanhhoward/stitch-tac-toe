import React from "react";
import {
  emptyToken,
  liloToken,
  stitchToken,
  tieToken,
} from "../constants/tokens";
import { Coordinate, State } from "../types";

export default function useStitchTacToe(initialState: State) {
  const [state, setState] = React.useState(initialState);

  function placeToken(position: Coordinate) {
    if (state.board.isOccupiedAt(position) || state.winner !== emptyToken) {
      return;
    }

    setState(({ board: prevBoard, token: prevToken }) => {
      const board = prevBoard.add(prevToken, position);
      const token = getToken();
      const winner = board.checkForWinner();
      const gameStatus = getGameStatus();

      return { board, gameStatus, token, winner };

      ///////////////////////////////////////////////////////////////////

      function getToken() {
        return prevToken === stitchToken ? liloToken : stitchToken;
      }

      function getGameStatus() {
        return winner === emptyToken
          ? `${token.name}'s turn`
          : winner === tieToken
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
