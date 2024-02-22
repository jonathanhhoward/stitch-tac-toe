import { Coordinate, Player, State } from "../../types";
import Square from "./Square";

interface RowProps {
  handleClick: (value: Coordinate) => void;
  players: Player[];
  row: number;
  state: State;
}

export default function Row({ handleClick, players, row, state }: RowProps) {
  return (
    <div className="row">
      {players.map((player, col) => (
        <Square
          handleClick={handleClick}
          key={`square:${row}${col}`}
          player={player}
          position={[row, col]}
          state={state}
        />
      ))}
    </div>
  );
}
