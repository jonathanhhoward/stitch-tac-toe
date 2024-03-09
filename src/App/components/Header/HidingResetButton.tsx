import React from "react";
import AppContext from "../../AppContext";

export default function HidingResetButton() {
  const { state, startOver } = React.useContext(AppContext);

  const resetButton = (
    <button className="reset" onClick={startOver} type="button">
      Play Again
    </button>
  );

  return <>{state.winner.name ? resetButton : null}</>;
}
