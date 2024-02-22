import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function Header() {
  const { state, startOver } = useContext(AppContext);

  return (
    <div className="Header">
      <div className="message">
        {state.winner.name
          ? state.winner.name === "Tie"
            ? "Tie!"
            : `${state.winner.name} wins!`
          : `${state.player.name}'s turn`}
      </div>
      {state.winner.name ? (
        <button className="reset" onClick={startOver} type="button">
          Play Again
        </button>
      ) : null}
    </div>
  );
}
