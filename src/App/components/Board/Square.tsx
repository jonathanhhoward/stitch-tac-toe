import { Player } from "../../models/player";

interface SquareProps {
  onClick: () => void;
  player: Player | null;
}

export default function Square({ onClick, player }: SquareProps) {
  return (
    <div className="Square" onClick={onClick}>
      {player && (
        <img
          alt={player.token.name}
          className="token"
          src={player.token.image}
        />
      )}
    </div>
  );
}
