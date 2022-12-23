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

function App() {
  const [state, setState] = useState(initialState);

  const checkForWinner = (board: string[][]) => {
    if (
      board[0][0] &&
      board[0][1] &&
      board[0][2] &&
      board[0][0] === board[0][1] &&
      board[0][1] === board[0][2]
    ) {
      return board[0][0];
    } else if (
      board[1][0] &&
      board[1][1] &&
      board[1][2] &&
      board[1][0] === board[1][1] &&
      board[1][1] === board[1][2]
    ) {
      return board[1][0];
    } else if (
      board[2][0] &&
      board[2][1] &&
      board[2][2] &&
      board[2][0] === board[2][1] &&
      board[2][1] === board[2][2]
    ) {
      return board[2][0];
    } else if (
      board[0][0] &&
      board[1][0] &&
      board[2][0] &&
      board[0][0] === board[1][0] &&
      board[1][0] === board[2][0]
    ) {
      return board[0][0];
    } else if (
      board[0][1] &&
      board[1][1] &&
      board[2][1] &&
      board[0][1] === board[1][1] &&
      board[1][1] === board[2][1]
    ) {
      return board[0][1];
    } else if (
      board[0][2] &&
      board[1][2] &&
      board[2][2] &&
      board[0][2] === board[1][2] &&
      board[1][2] === board[2][2]
    ) {
      return board[0][2];
    } else if (
      board[0][0] &&
      board[1][1] &&
      board[2][2] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    } else if (
      board[0][2] &&
      board[1][1] &&
      board[2][0] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    } else if (
      board
        .map((r) => r.map((s) => !!s).reduce((p, c) => p && c))
        .reduce((p, c) => p && c)
    ) {
      return "Tie";
    }
    return "";
  };

  const handleClickSquare = (i: number, j: number) => {
    setState((state) => {
      const board = state.board.map((row) => row.slice());
      if (board[i][j]) return state;
      board[i][j] = state.player;
      const player = state.player === "Stitch" ? "Lilo" : "Stitch";
      const winner = checkForWinner(board);
      return { board, player, winner };
    });
  };

  const handleClickReset = () => setState(initialState);

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
              {square}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
