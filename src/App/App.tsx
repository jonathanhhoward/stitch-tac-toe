import "./App.css";
import { AppContext } from "./AppContext";
import Board from "./components/Board/Board";
import Header from "./components/Header";
import { useStitchTacToe } from "./hooks/useStitchTacToe";

export default function App() {
  const { state, startOver, placeToken } = useStitchTacToe();
  const context = { state, startOver, placeToken };

  return (
    <AppContext.Provider value={context}>
      <div className="App">
        <Header state={state} handleClick={startOver} />
        <Board />
      </div>
    </AppContext.Provider>
  );
}
