import { Player } from "../../types";
import Square from "./Square";

interface RowProps {
  players: Player[];
  row: number;
}

export default function Row({ players, row }: RowProps) {
  return (
    <div className="row">
      {players.map((player, col) => (
        <Square
          key={`square:${row}${col}`}
          player={player}
          position={[row, col]}
        />
      ))}
    </div>
  );
}
