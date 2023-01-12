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
  if (isThreeInARow(board[0][0], board[0][1], board[0][2])) {
    // row:0
    return board[0][0];
  } else if (isThreeInARow(board[1][0], board[1][1], board[1][2])) {
    // row:1
    return board[1][0];
  } else if (isThreeInARow(board[2][0], board[2][1], board[2][2])) {
    // row:2
    return board[2][0];
  } else if (isThreeInARow(board[0][0], board[1][0], board[2][0])) {
    // col:0
    return board[0][0];
  } else if (isThreeInARow(board[0][1], board[1][1], board[2][1])) {
    // col:1
    return board[0][1];
  } else if (isThreeInARow(board[0][2], board[1][2], board[2][2])) {
    // col:2
    return board[0][2];
  } else if (isThreeInARow(board[0][0], board[1][1], board[2][2])) {
    // back diagonal
    return board[0][0];
  } else if (isThreeInARow(board[0][2], board[1][1], board[2][0])) {
    // forward diagonal
    return board[0][2];
  } else if (isFull(board)) {
    // full board
    return tiePlayer;
  }
  return emptyPlayer;
}

function isFull(board: Board): boolean {
  return board
    .map((row) => row.map((sqr) => !!sqr.name).reduce((acc, cur) => acc && cur))
    .reduce((acc, cur) => acc && cur);
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
  [row, col]: Coordinate
): Board {
  return board.map((boardRow, iRow) =>
    boardRow.map((square, iCol) =>
      row === iRow && col === iCol ? player : square
    )
  );
}

function getNextPlayer(player: Player): Player {
  return player.name === "Stitch" ? liloPlayer : stitchPlayer;
}
