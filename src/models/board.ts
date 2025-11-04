import { Coordinate, Grid } from "../types";
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
}
