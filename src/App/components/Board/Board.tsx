import { Coordinate, Grid } from "../../types";
import Square from "./Square";

interface BoardProps {
  grid: Grid;
  onSquareClick: (position: Coordinate) => void;
}

export default function Board({ grid, onSquareClick }: BoardProps) {
  return (
    <div className="Board">
      {grid.map((squares, row) => (
        <div className="row" key={`row:${row}`}>
          {squares.map((square, col) => (
            <Square
              key={`square:${row}${col}`}
              onClick={() => onSquareClick([row, col])}
              token={square}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
