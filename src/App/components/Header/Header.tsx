import React from "react";
import AppContext from "../../AppContext";

export default function Header() {
  const { state, startOver } = React.useContext(AppContext);

  const gameStatus = state.winner.name
    ? state.winner.name === "Tie"
      ? "Tie!"
      : `${state.winner.name} wins!`
    : `${state.player.name}'s turn`;

  const resetButton = (
    <button className="reset" onClick={startOver} type="button">
      Play Again
    </button>
  );

  return (
    <div className="Header">
      <div className="gameStatus">{gameStatus}</div>
      {state.winner.name ? resetButton : null}
    </div>
  );
}
