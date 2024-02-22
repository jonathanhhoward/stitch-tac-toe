import { Coordinate, Player, State } from "../../types";

interface SquareProps {
  handleClick: (value: Coordinate) => void;
  player: Player;
  position: Coordinate;
  state: State;
}

export default function Square({
  handleClick,
  player,
  position,
  state,
}: SquareProps) {
  return (
    <button
      className="Square"
      disabled={!!state.winner.name}
      onClick={() => handleClick(position)}
      type="button"
    >
      {player.name ? (
        <img alt={player.name} className="icon" src={player.image} />
      ) : null}
    </button>
  );
}
