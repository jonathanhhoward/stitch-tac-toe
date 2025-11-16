import "./App.css";
import { initialState } from "../constants/initialState";
import { useTurnState } from "../hooks/useTurnState.ts";
import Board from "./Board";
import Header from "./Header";

export default function App() {
  const { state, executeTurn, startOver } = useTurnState(initialState);

  return (
    <div className="App">
      <Header
        gameStatus={state.status}
        player={state.player}
        onResetClick={startOver}
        showReset={!!state.winner}
      />
      <Board board={state.board} onSquareClick={executeTurn} />
    </div>
  );
}
