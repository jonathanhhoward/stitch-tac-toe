import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import { initialState } from "./constants/initialState";
import useStitchTacToe from "./hooks/useStitchTacToe";

export default function App() {
  const { state, placeToken, startOver } = useStitchTacToe(initialState);

  return (
    <div className="App">
      <Header
        gameStatus={state.gameStatus}
        onResetClick={startOver}
        winner={state.winner}
      />
      <Board board={state.board} onSquareClick={placeToken} />
    </div>
  );
}
