import "./App.css";
import { AppContext } from "./AppContext";
import { Board } from "./components/Board";
import { Header } from "./components/Header";
import { useStitchTacToe } from "./hooks/useStitchTacToe";

export default function App() {
  const context = useStitchTacToe();

  return (
    <AppContext.Provider value={context}>
      <div className="App">
        <Header />
        <Board />
      </div>
    </AppContext.Provider>
  );
}
