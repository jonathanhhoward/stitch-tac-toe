import { Token } from "../../types";

interface SquareProps {
  onClick: () => void;
  token: Token | null;
}

export default function Square({ onClick, token }: SquareProps) {
  return (
    <div className="Square" onClick={onClick}>
      {token && <img alt={token.name} className="token" src={token.image} />}
    </div>
  );
}
