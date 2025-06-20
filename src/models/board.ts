import { Coordinate, Grid } from "../types";
import { Player } from "./player";

export class Board {
  #grid: Grid;

  constructor(grid?: Grid) {
    this.#grid = grid?.slice() ?? [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  get grid() {
    return this.#grid;
  }

  add(player: Player, [row, col]: Coordinate): void {
    this.#grid = this.#grid.map((boardRow, iRow) =>
      boardRow.map((square, iCol) =>
        row === iRow && col === iCol ? player : square,
      ),
    );
  }

  isOccupiedAt([row, col]: Coordinate): boolean {
    return !!this.grid[row][col];
  }
}
