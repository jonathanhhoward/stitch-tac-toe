import { checkForWinner } from "./checkForWinner";
import { Props } from "./types";

interface Place {
  row: number;
  col: number;
}

interface SquareProps extends Props {
  place: Place;
  value: string;
}

export function Square({ place, state, setState, value }: SquareProps) {
  function handleClick({ row, col }: Place) {
    setState((prevState) => {
      if (prevState.board[row][col]) return prevState;
      const board = prevState.board.map((boardRow, i) =>
        boardRow.map((boardSquare, j) =>
          i === row && j === col ? prevState.player : boardSquare
        )
      );
      const player = prevState.player === "Stitch" ? "Lilo" : "Stitch";
      const winner = checkForWinner(board);
      return { board, player, winner };
    });
  }

  return (
    <button
      className="Square"
      onClick={() => handleClick(place)}
      disabled={!!state.winner}
    >
      {value ? <img className="icon" src={`${value}.png`} alt={value} /> : null}
    </button>
  );
}
