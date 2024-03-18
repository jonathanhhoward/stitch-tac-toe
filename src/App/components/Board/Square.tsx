import { Player } from "../../types";

interface SquareProps {
  onClick: () => void;
  player: Player;
}

export default function Square({ onClick, player }: SquareProps) {
  const icon = <img alt={player.name} className="icon" src={player.image} />;

  return (
    <div className="Square" onClick={onClick}>
      {player.name ? icon : null}
    </div>
  );
}
