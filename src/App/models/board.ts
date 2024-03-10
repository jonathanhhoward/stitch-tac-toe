import { emptyPlayer, tiePlayer } from "../constants/players";
import { Coordinate, Player, PlayerGrid } from "../types";

export default class Board {
  protected constructor(public readonly grid: PlayerGrid) {}

  static create(): Board {
    return new Board(Array(3).fill(Array(3).fill(emptyPlayer)));
  }

  add(player: Player, [row, col]: Coordinate): Board {
    return new Board(
      this.grid.map((boardRow, iRow) =>
        boardRow.map((square, iCol) =>
          row === iRow && col === iCol ? player : square,
        ),
      ),
    );
  }

  checkForWinner(): Player {
    for (let row = 0; row < 3; ++row) {
      if (this.isWinnerInRow(row)) {
        return this.grid[row][0];
      }
    }

    for (let col = 0; col < 3; ++col) {
      if (this.isWinnerInColumn(col)) {
        return this.grid[0][col];
      }
    }

    if (this.isWinnerInBackDiagonal() || this.isWinnerInForwardDiagonal()) {
      return this.grid[1][1];
    }

    if (this.isFull()) {
      return tiePlayer;
    }

    return emptyPlayer;
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
    return this.grid
      .map((row) =>
        row.map((sqr) => !!sqr.name).reduce((acc, cur) => acc && cur),
      )
      .reduce((acc, cur) => acc && cur);
  }

  private isThreeInARow(sq1: Player, sq2: Player, sq3: Player) {
    return (
      !!sq1.name &&
      !!sq2.name &&
      !!sq3.name &&
      sq1.name === sq2.name &&
      sq1.name === sq3.name
    );
  }
}
