import Square from "./Square";
import { Board as GameBoard } from "../models/board.ts";
import { Coordinate } from "../models/coordinate.ts";

interface BoardProps {
  board: GameBoard;
  onSquareClick: (position: Coordinate) => void;
}

export default function Board({ board, onSquareClick }: BoardProps) {
  return (
    <div className="Board">
      {board.rows().map((squares, row) => (
        <div className="row" key={`row:${row}`}>
          {squares.map((square, col) => (
            <Square
              key={`square:${row}${col}`}
              onClick={() => onSquareClick(new Coordinate(row, col))}
              player={square}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
