import GameBoard from "../../models/board";
import { Coordinate } from "../../types";
import Square from "./Square";

interface BoardProps {
  board: GameBoard;
  onSquareClick: (position: Coordinate) => void;
}

export default function Board({ board, onSquareClick }: BoardProps) {
  return (
    <div className="Board">
      {board.grid.map((players, row) => (
        <div className="row" key={`row:${row}`}>
          {players.map((player, col) => (
            <Square
              key={`square:${row}${col}`}
              onClick={() => onSquareClick([row, col])}
              player={player}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
