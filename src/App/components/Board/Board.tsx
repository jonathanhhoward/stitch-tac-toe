import { Coordinate, Token } from "../../types";
import Square from "./Square";

interface BoardProps {
  grid: Token[][];
  onSquareClick: (position: Coordinate) => void;
}

export default function Board({ grid, onSquareClick }: BoardProps) {
  return (
    <div className="Board">
      {grid.map((tokens, row) => (
        <div className="row" key={`row:${row}`}>
          {tokens.map((token, col) => (
            <Square
              key={`square:${row}${col}`}
              onClick={() => onSquareClick([row, col])}
              token={token}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
