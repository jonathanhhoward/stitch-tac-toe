import { tieToken } from "../constants/tokens";
import { Coordinate, Grid, Square, Token } from "../types";
import { Player } from "./player";

export default class Board {
  protected constructor(private _grid: Grid) {}

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

  add(token: Token, [row, col]: Coordinate): void {
    this._grid = this._grid.map((boardRow, iRow) =>
      boardRow.map((square, iCol) =>
        row === iRow && col === iCol ? token : square,
      ),
    );
  }

  checkForWinner(): Player | null {
    for (let i = 0; i < 3; ++i) {
      if (this.isWinnerInRow(i) || this.isWinnerInColumn(i)) {
        return new Player(this.grid[i][i]!);
      }
    }

    if (this.isWinnerInBackDiagonal() || this.isWinnerInForwardDiagonal()) {
      return new Player(this.grid[1][1]!);
    }

    if (this.isFull()) {
      return new Player(tieToken);
    }

    return null;
  }

  isOccupiedAt([row, col]: Coordinate): boolean {
    return !!this.grid[row][col];
  }

  private isWinnerInRow(row: number) {
    return this.isThreeInARow(
      this.grid[row][0],
      this.grid[row][1],
      this.grid[row][2],
    );
  }

  private isWinnerInColumn(col: number) {
    return this.isThreeInARow(
      this.grid[0][col],
      this.grid[1][col],
      this.grid[2][col],
    );
  }

  private isWinnerInBackDiagonal() {
    return this.isThreeInARow(
      this.grid[0][0],
      this.grid[1][1],
      this.grid[2][2],
    );
  }

  private isWinnerInForwardDiagonal() {
    return this.isThreeInARow(
      this.grid[0][2],
      this.grid[1][1],
      this.grid[2][0],
    );
  }

  private isFull() {
    // prettier-ignore
    return this.grid.reduce(
      (rowAcc, rowCur) => rowAcc && rowCur.reduce(
        (tokenAcc, tokenCur) => tokenAcc && !!tokenCur,
        true,
      ),
      true,
    );
  }

  private isThreeInARow(sq1: Square, sq2: Square, sq3: Square) {
    return !!sq1 && !!sq2 && !!sq3 && sq1 === sq2 && sq1 === sq3;
  }
}
