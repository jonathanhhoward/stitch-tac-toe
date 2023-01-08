import { State } from "../types";

interface Props {
  state: State;
  handleClick: () => void;
}

export default function Header({ state, handleClick }: Props) {
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
        <button className="reset" onClick={handleClick} type="button">
          Play Again
        </button>
      ) : null}
    </div>
  );
}
