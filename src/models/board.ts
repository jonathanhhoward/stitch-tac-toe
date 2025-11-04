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

  rows(): Grid {
    return this.#grid.map((row) => [...row]);
  }

  add(player: Player, position: Coordinate): Board {
    return new Board(
      this.#grid.map((gridRow, row) =>
        gridRow.map((square, col) =>
          position.matches(row, col) ? player : square,
        ),
      ),
    );
  }

  isOccupiedAt(position: Coordinate): boolean {
    const { row, col } = position;
    return !!this.#getAtRC(row, col);
  }

  winner(): Player | null {
    for (let i = 0; i < 3; ++i) {
      if (this.#isWinnerInRow(i) || this.#isWinnerInColumn(i)) {
        return this.#getAtRC(i, i);
      }
    }

    if (this.#isWinnerInBackDiagonal() || this.#isWinnerInForwardDiagonal()) {
      return this.#getAtRC(1, 1);
    }

    if (this.#isFull()) {
      return tie;
    }

    return null;
  }

  #getAtRC(row: number, col: number): Player | null {
    return this.#grid[row][col];
  }

  #isWinnerInRow(row: number) {
    return this.#isThreeInARow(
      this.#getAtRC(row, 0),
      this.#getAtRC(row, 1),
      this.#getAtRC(row, 2),
    );
  }

  #isWinnerInColumn(col: number) {
    return this.#isThreeInARow(
      this.#getAtRC(0, col),
      this.#getAtRC(1, col),
      this.#getAtRC(2, col),
    );
  }

  #isWinnerInBackDiagonal() {
    return this.#isThreeInARow(
      this.#getAtRC(0, 0),
      this.#getAtRC(1, 1),
      this.#getAtRC(2, 2),
    );
  }

  #isWinnerInForwardDiagonal() {
    return this.#isThreeInARow(
      this.#getAtRC(0, 2),
      this.#getAtRC(1, 1),
      this.#getAtRC(2, 0),
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
