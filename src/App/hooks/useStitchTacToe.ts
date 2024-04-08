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

    setState(({ board, player: prevPlayer }) => {
      prevPlayer.placeToken(board, position);
      const token = getToken();
      const player = getPlayer();
      const winner = board.checkForWinner();
      const gameStatus = getGameStatus();

      return { board, gameStatus, player, token, winner };

      ///////////////////////////////////////////////////////////////////

      function getPlayer() {
        return new Player(getToken());
      }

      function getToken() {
        return prevPlayer.token === stitchToken ? liloToken : stitchToken;
      }

      function getGameStatus() {
        return winner
          ? winner.token === tieToken
            ? "Tie!"
            : `${winner.token.name} wins!`
          : `${token.name}'s turn`;
      }
    });
  }

  function startOver() {
    setState(initialState);
  }

  return { state, executeTurn, startOver };
}
