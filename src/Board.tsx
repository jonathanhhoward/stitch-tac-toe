import { Props } from "./types";
import { Square } from "./Square";

export default function Board({ state, setState }: Props) {
  return (
    <>
      {state.board.map((row, i) => (
        <div className="row" key={`row:${i}`}>
          {row.map((square, j) => (
            <Square
              key={`square:${i}${j}`}
              place={{ row: i, col: j }}
              state={state}
              setState={setState}
              value={square}
            />
          ))}
        </div>
      ))}
    </>
  );
}
