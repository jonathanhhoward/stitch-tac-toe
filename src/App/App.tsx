import "./App.css";
import Board from "./components/Board/Board";
import Header from "./components/Header";
import { useStitchTacToe } from "./hooks/useStitchTacToe";

export default function App() {
  const { state, startOver, placeToken } = useStitchTacToe();

  return (
    <div className="App">
      <Header state={state} handleClick={startOver} />
      <Board state={state} handleClick={placeToken} />
    </div>
  );
}
