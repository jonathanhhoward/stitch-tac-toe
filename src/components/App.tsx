import "./App.css";
import Board from "./Board";
import Header from "./Header";
import { initialState } from "../constants/initialState";
import { useGame } from "../hooks/useGame.ts";

export default function App() {
  const { state, executeTurn, startOver } = useGame(initialState);

  return (
    <div className="App">
      <Header
        gameStatus={state.status}
        onResetClick={startOver}
        showReset={!!state.winner}
      />
      <Board board={state.board} onSquareClick={executeTurn} />
    </div>
  );
}
