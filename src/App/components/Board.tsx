import { Coordinate, State } from "../types";

interface Props {
  state: State;
  handleClick: (value: Coordinate) => void;
}

export default function Board({ state, handleClick }: Props) {
  return (
    <>
      {state.board.map((row, iRow) => (
        <div className="row" key={`row:${iRow}`}>
          {row.map((square, iCol) => (
            <button
              key={`square:${iRow}${iCol}`}
              className="Square"
              onClick={() => handleClick([iRow, iCol])}
              disabled={!!state.winner.name}
              type="button"
            >
              <img className="icon" src={square.image} alt={square.name} />
            </button>
          ))}
        </div>
      ))}
    </>
  );
}
