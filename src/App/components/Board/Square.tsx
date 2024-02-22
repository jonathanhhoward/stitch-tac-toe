import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { Coordinate, Player } from "../../types";

interface SquareProps {
  player: Player;
  position: Coordinate;
}

export default function Square({ player, position }: SquareProps) {
  const { state, placeToken } = useContext(AppContext);

  const handleClick = () => !state.winner.name && placeToken(position);

  const icon = <img alt={player.name} className="icon" src={player.image} />;

  return (
    <div className="Square" onClick={handleClick}>
      {player.name ? icon : null}
    </div>
  );
}
