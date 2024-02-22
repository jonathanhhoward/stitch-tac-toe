import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { Coordinate, Player } from "../../types";

interface SquareProps {
  player: Player;
  position: Coordinate;
}

export default function Square({ player, position }: SquareProps) {
  const { state, placeToken } = useContext(AppContext);

  return (
    <button
      className="Square"
      disabled={!!state.winner.name}
      onClick={() => placeToken(position)}
      type="button"
    >
      {player.name ? (
        <img alt={player.name} className="icon" src={player.image} />
      ) : null}
    </button>
  );
}
