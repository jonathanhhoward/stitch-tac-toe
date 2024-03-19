import React from "react";
import AppContext from "../../AppContext";

export default function Header() {
  const { state, startOver } = React.useContext(AppContext);

  const resetButton = (
    <button className="reset" onClick={startOver} type="button">
      Play Again
    </button>
  );

  return (
    <div className="Header">
      <div className="gameStatus">{state.gameStatus}</div>
      {state.winner.name ? resetButton : null}
    </div>
  );
}
