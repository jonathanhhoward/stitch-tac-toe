import { TurnStatus } from "../models/turnStatus.ts";
import { Player } from "../models/player";

interface HeaderProps {
  gameStatus: TurnStatus;
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
