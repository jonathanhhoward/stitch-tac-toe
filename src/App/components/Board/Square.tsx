import { Player } from "../../types";

interface SquareProps {
  onClick: () => void;
  player: Player;
}

export default function Square({ onClick, player }: SquareProps) {
  const token = <img alt={player.name} className="token" src={player.token} />;

  return (
    <div className="Square" onClick={onClick}>
      {player.name ? token : null}
    </div>
  );
}
