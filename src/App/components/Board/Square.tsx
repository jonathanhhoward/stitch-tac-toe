import { emptyPlayer } from "../../constants/players";
import { Player } from "../../types";

interface SquareProps {
  onClick: () => void;
  player: Player;
}

export default function Square({ onClick, player }: SquareProps) {
  const token = <img alt={player.name} className="token" src={player.token} />;
  const showToken = player !== emptyPlayer;

  return (
    <div className="Square" onClick={onClick}>
      {showToken ? token : null}
    </div>
  );
}
