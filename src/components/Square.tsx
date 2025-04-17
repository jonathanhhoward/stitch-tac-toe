import { Player } from "../models/player";

interface SquareProps {
  onClick: () => void;
  player: Player | null;
}

export default function Square({ onClick, player }: SquareProps) {
  return (
    <div className="Square" onClick={onClick}>
      {player && <img alt={player.name} className="image" src={player.image} />}
    </div>
  );
}
