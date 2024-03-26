interface HeaderProps {
  gameStatus: string;
  onResetClick: () => void;
  showReset: boolean;
}

export default function Header({
  gameStatus,
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
      <div className="gameStatus">{gameStatus}</div>
      {showReset ? resetButton : null}
    </div>
  );
}
