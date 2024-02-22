import { Coordinate, State } from "../../types";
import Row from "./Row";

interface BoardProps {
  handleClick: (value: Coordinate) => void;
  state: State;
}

export default function Board({ handleClick, state }: BoardProps) {
  return (
    <>
      {state.board.grid.map((players, row) => (
        <Row
          handleClick={handleClick}
          key={`row:${row}`}
          row={row}
          players={players}
          state={state}
        />
      ))}
    </>
  );
}
