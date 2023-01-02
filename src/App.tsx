import React from "react";
import "./App.css";
import Board from "./Board";
import Header from "./Header";
import { State } from "./types";

export const initialState: State = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  player: "Stitch",
  winner: "",
};

export default function App() {
  const [state, setState] = React.useState(initialState);

  return (
    <div className="App">
      <Header state={state} setState={setState} />
      <Board state={state} setState={setState} />
    </div>
  );
}
