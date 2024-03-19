import { Player } from "../../types";

interface HeaderProps {
  gameStatus: string;
  onResetClick: () => void;
  winner: Player;
}

export default function Header({
  gameStatus,
  onResetClick,
  winner,
}: HeaderProps) {
  const resetButton = (
    <button className="reset" onClick={onResetClick} type="button">
      Play Again
    </button>
  );

  return (
    <div className="Header">
      <div className="gameStatus">{gameStatus}</div>
      {winner.name ? resetButton : null}
    </div>
  );
}
