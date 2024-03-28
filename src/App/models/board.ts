import { emptyToken, tieToken } from "../constants/tokens";
import { Coordinate, Token } from "../types";

export default class Board {
  protected constructor(public readonly grid: Token[][]) {}

  static create(): Board {
    return new Board(Array(3).fill(Array(3).fill(emptyToken)));
  }

  add(token: Token, [row, col]: Coordinate): Board {
    return new Board(
      this.grid.map((boardRow, iRow) =>
        boardRow.map((square, iCol) =>
          row === iRow && col === iCol ? token : square,
        ),
      ),
    );
  }

  checkForWinner(): Token {
    for (let i = 0; i < 3; ++i) {
      if (this.isWinnerInRow(i) || this.isWinnerInColumn(i)) {
        return this.grid[i][i];
      }
    }

    if (this.isWinnerInBackDiagonal() || this.isWinnerInForwardDiagonal()) {
      return this.grid[1][1];
    }

    if (this.isFull()) {
      return tieToken;
    }

    return emptyToken;
  }

  isOccupiedAt([row, col]: Coordinate): boolean {
    return !!this.grid[row][col].name;
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
        (tokenAcc, tokenCur) => tokenAcc && tokenCur !== emptyToken,
        true,
      ),
      true,
    );
  }

  private isThreeInARow(sq1: Token, sq2: Token, sq3: Token) {
    return (
      sq1 !== emptyToken &&
      sq2 !== emptyToken &&
      sq3 !== emptyToken &&
      sq1 === sq2 &&
      sq1 === sq3
    );
  }
}
