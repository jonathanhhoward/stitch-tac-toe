import { initialState } from "./App";
import { Props } from "./types";

export default function Header({ state, setState }: Props) {
  function handleClick() {
    setState(initialState);
  }

  return (
    <div className="Header">
      <div className="message">
        {state.winner
          ? state.winner === "Tie"
            ? "Tie!"
            : `${state.winner} wins!`
          : `${state.player}'s turn`}
      </div>
      {state.winner ? (
        <button className="reset" onClick={handleClick}>
          Play Again
        </button>
      ) : null}
    </div>
  );
}
