import React from "react";
import { liloToken, stitchToken, tieToken } from "../constants/tokens";
import { Player } from "../models/player";
import { Coordinate, State } from "../types";

export default function useStitchTacToe(initialState: () => State) {
  const [state, setState] = React.useState(initialState);

  function executeTurn(position: Coordinate) {
    if (state.board.isOccupiedAt(position) || state.winner) {
      return;
    }

    setState(({ board, token: prevToken }) => {
      board.add(prevToken, position);
      const token = getToken();
      const player = new Player(token);
      const winner = board.checkForWinner();
      const gameStatus = getGameStatus();

      return { board, gameStatus, player, token, winner };

      ///////////////////////////////////////////////////////////////////

      function getToken() {
        return prevToken === stitchToken ? liloToken : stitchToken;
      }

      function getGameStatus() {
        return winner
          ? winner === tieToken
            ? "Tie!"
            : `${winner.name} wins!`
          : `${token.name}'s turn`;
      }
    });
  }

  function startOver() {
    setState(initialState);
  }

  return { state, executeTurn, startOver };
}
