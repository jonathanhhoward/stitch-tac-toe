import { Coordinate } from "../types.ts";
import Square from "./Square";
import { Board as GameBoard } from "../models/board.ts";

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
              onClick={() => onSquareClick([row, col])}
              player={square}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
