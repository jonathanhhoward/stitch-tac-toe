import { Player } from "../models/player";
import { GameStatus } from "../models/gameStatus";

interface HeaderProps {
  gameStatus: GameStatus;
  player: Player;
  onResetClick: () => void;
  showReset: boolean;
}

export default function Header({
  gameStatus,
  player,
  onResetClick,
  showReset,
}: HeaderProps) {
  const resetButton = (
    <button className="reset" onClick={onResetClick} type="button">
      Play Again
    </button>
  );

  return (
    <div className="Header">
      <div className="gameStatus">{gameStatus.toString(player)}</div>
      {showReset ? resetButton : null}
    </div>
  );
}
