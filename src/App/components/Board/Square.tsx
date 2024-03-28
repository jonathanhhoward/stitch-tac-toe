import { emptyToken } from "../../constants/tokens";
import { Token } from "../../types";

interface SquareProps {
  onClick: () => void;
  token: Token;
}

export default function Square({ onClick, token }: SquareProps) {
  const tokenImg = <img alt={token.name} className="token" src={token.image} />;
  const showToken = token !== emptyToken;

  return (
    <div className="Square" onClick={onClick}>
      {showToken ? tokenImg : null}
    </div>
  );
}
