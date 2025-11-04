import { Coordinate, Grid } from "../types";
import { Player } from "./player";
import { tie } from "../constants/players";

export class Board {
  readonly #grid: Grid;

  constructor(grid?: Grid) {
    this.#grid = grid ?? [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  // Return a safe copy of the rows so callers don't get direct access
  rows(): Grid {
    return this.#grid.map((row) => [...row]);
  }

  getAt(position: Coordinate): Player | null {
    const { row, col } = position;
    return this.#grid[row][col];
  }

  add(player: Player, position: Coordinate): Board {
    const { row, col } = position;
    return new Board(
      this.#grid.map((boardRow, iRow) =>
        boardRow.map((square, iCol) =>
          row === iRow && col === iCol ? player : square,
        ),
      ),
    );
  }

  isOccupiedAt(position: Coordinate): boolean {
    return !!this.getAt(position);
  }

  // Determine if there is a winner or a tie on this board
  winner(): Player | null {
    for (let i = 0; i < 3; ++i) {
      if (this.#isWinnerInRow(i) || this.#isWinnerInColumn(i)) {
        return this.getAt(new Coordinate(i, i));
      }
    }

    if (this.#isWinnerInBackDiagonal() || this.#isWinnerInForwardDiagonal()) {
      return this.getAt(new Coordinate(1, 1));
    }

    if (this.#isFull()) {
      return tie;
    }

    return null;
  }

  #isWinnerInRow(row: number) {
    return this.#isThreeInARow(
      this.getAt(new Coordinate(row, 0)),
      this.getAt(new Coordinate(row, 1)),
      this.getAt(new Coordinate(row, 2)),
    );
  }

  #isWinnerInColumn(col: number) {
    return this.#isThreeInARow(
      this.getAt(new Coordinate(0, col)),
      this.getAt(new Coordinate(1, col)),
      this.getAt(new Coordinate(2, col)),
    );
  }

  #isWinnerInBackDiagonal() {
    return this.#isThreeInARow(
      this.getAt(new Coordinate(0, 0)),
      this.getAt(new Coordinate(1, 1)),
      this.getAt(new Coordinate(2, 2)),
    );
  }

  #isWinnerInForwardDiagonal() {
    return this.#isThreeInARow(
      this.getAt(new Coordinate(0, 2)),
      this.getAt(new Coordinate(1, 1)),
      this.getAt(new Coordinate(2, 0)),
    );
  }

  #isFull() {
    return this.rows()
      .flat()
      .every((square) => !!square);
  }

  #isThreeInARow(sq1: Player | null, sq2: Player | null, sq3: Player | null) {
    return !!sq1 && sq1 === sq2 && sq1 === sq3;
  }
}
