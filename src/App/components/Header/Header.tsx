import React from "react";
import AppContext from "../../AppContext";
import HidingResetButton from "./HidingResetButton";

export default function Header() {
  const { state } = React.useContext(AppContext);

  const gameStatus = state.winner.name
    ? state.winner.name === "Tie"
      ? "Tie!"
      : `${state.winner.name} wins!`
    : `${state.player.name}'s turn`;

  return (
    <div className="Header">
      <div className="gameStatus">{gameStatus}</div>
      <HidingResetButton />
    </div>
  );
}
