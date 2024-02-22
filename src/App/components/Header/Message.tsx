import { useContext } from "react";
import { AppContext } from "../../AppContext";

export default function Message() {
  const { state } = useContext(AppContext);

  const winner =
    state.winner.name === "Tie" ? "Tie!" : `${state.winner.name} wins!`;

  const nextPlayer = `${state.player.name}'s turn`;

  return (
    <div className="message">{state.winner.name ? winner : nextPlayer}</div>
  );
}
