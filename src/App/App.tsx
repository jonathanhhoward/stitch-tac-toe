import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import { initialState } from "./constants/initialState";
import { useGame } from "./hooks/useGame.ts";

export default function App() {
  const { state, executeTurn, startOver } = useGame(initialState);

  return (
    <div className="App">
      <Header
        gameStatus={state.gameStatus}
        onResetClick={startOver}
        showReset={!!state.winner}
      />
      <Board grid={state.board.grid} onSquareClick={executeTurn} />
    </div>
  );
}
