import React from "react";
import lilo from "../images/lilo.png";
import stitch from "../images/stitch.png";
import { Board, Coordinate, Player, State } from "../types";

const emptyPlayer: Player = { name: "", image: "" };
const liloPlayer: Player = { name: "Lilo", image: lilo };
const stitchPlayer: Player = { name: "Stitch", image: stitch };
const tiePlayer: Player = { name: "Tie", image: "" };

const initialState: State = {
  board: new Array(3).fill(new Array(3).fill(emptyPlayer)),
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
      if (isSquareOccupied(state.board, position)) return state;

      const board = addPlayerToBoard(state.board, state.player, position);

      return {
        board,
        player: getNextPlayer(state.player),
        winner: checkForWinner(board),
      };
    });
  }

  return { state, startOver, placeToken };
}

function checkForWinner(board: Board): Player {
  return (
    winnerInRowOrColumn(board) ||
    winnerInDiagonal(board) ||
    tieGame(board) ||
    emptyPlayer
  );
}

function winnerInRowOrColumn(board: Board): Player | null {
  for (let i = 0; i < 3; ++i) {
    if (isThreeInARow(board[i][0], board[i][1], board[i][2])) {
      return board[i][0];
    }
    if (isThreeInARow(board[0][i], board[1][i], board[2][i])) {
      return board[0][i];
    }
  }
  return null;
}

function winnerInDiagonal(board: Board): Player | null {
  const isWinnerInBackDiagonal = isThreeInARow(
    board[0][0],
    board[1][1],
    board[2][2],
  );
  const isWinnerInForwardDiagonal = isThreeInARow(
    board[0][2],
    board[1][1],
    board[2][0],
  );
  return isWinnerInBackDiagonal || isWinnerInForwardDiagonal
    ? board[1][1]
    : null;
}

function tieGame(board: Board): Player | null {
  const isBoardFull = board
    .map((row) => row.map((sqr) => !!sqr.name).reduce((acc, cur) => acc && cur))
    .reduce((acc, cur) => acc && cur);
  return isBoardFull ? tiePlayer : null;
}

function isThreeInARow(sq1: Player, sq2: Player, sq3: Player): boolean {
  return (
    !!sq1.name &&
    !!sq2.name &&
    !!sq3.name &&
    sq1.name === sq2.name &&
    sq1.name === sq3.name
  );
}

function isSquareOccupied(board: Board, [row, col]: Coordinate): boolean {
  return !!board[row][col].name;
}

function addPlayerToBoard(
  board: Board,
  player: Player,
  [row, col]: Coordinate,
): Board {
  return board.map((boardRow, iRow) =>
    boardRow.map((square, iCol) =>
      row === iRow && col === iCol ? player : square,
    ),
  );
}

function getNextPlayer(player: Player): Player {
  return player.name === "Stitch" ? liloPlayer : stitchPlayer;
}
