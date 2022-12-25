import React, { useState } from "react";
import "./App.css";
import { checkForWinner } from "./checkForWinner";

const initialState = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  player: "Stitch",
  winner: "",
};

export default function App() {
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
              {square ? (
                <img className="icon" src={`${square}.png`} alt={square} />
              ) : null}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
