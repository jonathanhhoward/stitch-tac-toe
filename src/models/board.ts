import { tie } from "../constants/players";
import { Grid } from "../types";
import { Coordinate } from "./coordinate.ts";
import { Player } from "./player";

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
    return !!this.#grid[row][col];
  }

  winner(): Player | null {
    for (let i = 0; i < 3; ++i) {
      if (this.#isWinnerInRow(i) || this.#isWinnerInColumn(i)) {
        return this.#grid[i][i];
      }
    }

    if (this.#isWinnerInBackDiagonal() || this.#isWinnerInForwardDiagonal()) {
      return this.#grid[1][1];
    }

    if (this.#isFull()) {
      return tie;
    }

    return null;
  }

  #isWinnerInRow(row: number) {
    return this.#isThreeInARow(
      this.#grid[row][0],
      this.#grid[row][1],
      this.#grid[row][2],
    );
  }

  #isWinnerInColumn(col: number) {
    return this.#isThreeInARow(
      this.#grid[0][col],
      this.#grid[1][col],
      this.#grid[2][col],
    );
  }

  #isWinnerInBackDiagonal() {
    return this.#isThreeInARow(
      this.#grid[0][0],
      this.#grid[1][1],
      this.#grid[2][2],
    );
  }

  #isWinnerInForwardDiagonal() {
    return this.#isThreeInARow(
      this.#grid[0][2],
      this.#grid[1][1],
      this.#grid[2][0],
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
