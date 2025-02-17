import { Coordinate, Grid } from "../types";
import { Player } from "./player";

export default class Board {
  constructor(private _grid: Grid) {}

  get grid() {
    return this._grid;
  }

  static create(): Board {
    return new Board([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  }

  add(player: Player, [row, col]: Coordinate): void {
    this._grid = this._grid.map((boardRow, iRow) =>
      boardRow.map((square, iCol) =>
        row === iRow && col === iCol ? player : square,
      ),
    );
  }

  isOccupiedAt([row, col]: Coordinate): boolean {
    return !!this.grid[row][col];
  }
}
