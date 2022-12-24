import React, { useState } from "react";
import "./App.css";

const initialState = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  player: "Stitch",
  winner: "",
};

export default function () {
  const [state, setState] = useState(initialState);

  function handleClickSquare(i: number, j: number) {
    setState((state) => {
      const board = state.board.map((row) => row.slice());
      if (board[i][j]) return state;
      board[i][j] = state.player;
      const player = state.player === "Stitch" ? "Lilo" : "Stitch";
      const winner = checkForWinner(board);
      return { board, player, winner };
    });
  }

  function handleClickReset() {
    setState(initialState);
  }

  return (
    <div className="App">
      <div className="header">
        <div className="message">
          {state.winner
            ? state.winner === "Tie"
              ? "Tie!"
              : `${state.winner} wins!`
            : `${state.player}'s turn`}
        </div>
        {state.winner ? (
          <button className="reset" onClick={handleClickReset}>
            Play Again
          </button>
        ) : null}
      </div>
      {state.board.map((row, i) => (
        <div className="row" key={`row:${i}`}>
          {row.map((square, j) => (
            <button
              className="square"
              key={`square:${i}${j}`}
              onClick={() => handleClickSquare(i, j)}
              disabled={!!state.winner}
            >
              {state.board[i][j] ? (
                <img
                  className="icon"
                  src={`${state.board[i][j]}.png`}
                  alt={state.board[i][j]}
                />
              ) : null}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

function checkForWinner(board: string[][]) {
  if (isEqual(board[0][0], board[0][1], board[0][2])) {
    // row:0
    return board[0][0];
  } else if (isEqual(board[1][0], board[1][1], board[1][2])) {
    // row:1
    return board[1][0];
  } else if (isEqual(board[2][0], board[2][1], board[2][2])) {
    // row:2
    return board[2][0];
  } else if (isEqual(board[0][0], board[1][0], board[2][0])) {
    // col:0
    return board[0][0];
  } else if (isEqual(board[0][1], board[1][1], board[2][1])) {
    // col:1
    return board[0][1];
  } else if (isEqual(board[0][2], board[1][2], board[2][2])) {
    // col:2
    return board[0][2];
  } else if (isEqual(board[0][0], board[1][1], board[2][2])) {
    // back diagonal
    return board[0][0];
  } else if (isEqual(board[0][2], board[1][1], board[2][0])) {
    // forward diagonal
    return board[0][2];
  } else if (
    // full board
    board
      .map((row) => row.map((sqr) => !!sqr).reduce((acc, cur) => acc && cur))
      .reduce((acc, cur) => acc && cur)
  ) {
    return "Tie";
  }
  return "";
}

function isEqual(sq1: string, sq2: string, sq3: string) {
  return !!sq1 && !!sq2 && !!sq3 && sq1 === sq2 && sq1 === sq3;
}
