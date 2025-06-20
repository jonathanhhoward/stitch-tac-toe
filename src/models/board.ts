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

  get grid() {
    return this.#grid;
  }

  add(player: Player, [row, col]: Coordinate): Board {
    return new Board(
      this.#grid.map((boardRow, iRow) =>
        boardRow.map((square, iCol) =>
          row === iRow && col === iCol ? player : square,
        ),
      ),
    );
  }

  isOccupiedAt([row, col]: Coordinate): boolean {
    return !!this.grid[row][col];
  }
}
