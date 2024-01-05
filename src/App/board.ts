import { emptyPlayer, tiePlayer } from "./players";
import { Coordinate, Player, PlayerGrid } from "./types";

export class Board {
  private constructor(private readonly board: PlayerGrid) {}

  static create(): Board {
    return new Board(Array(3).fill(Array(3).fill(emptyPlayer)));
  }

  addPlayerToBoard(player: Player, [row, col]: Coordinate): Board {
    return new Board(
      this.board.map((boardRow, iRow) =>
        boardRow.map((square, iCol) =>
          row === iRow && col === iCol ? player : square,
        ),
      ),
    );
  }

  checkForWinner(): Player {
    return (
      this.winnerInRowOrColumn() ||
      this.winnerInDiagonal() ||
      this.tieGame() ||
      emptyPlayer
    );
  }

  isSquareOccupied([row, col]: Coordinate): boolean {
    return !!this.board[row][col].name;
  }

  private winnerInRowOrColumn(): Player | null {
    for (let i = 0; i < 3; ++i) {
      if (
        this.isThreeInARow(this.board[i][0], this.board[i][1], this.board[i][2])
      ) {
        return this.board[i][0];
      }
      if (
        this.isThreeInARow(this.board[0][i], this.board[1][i], this.board[2][i])
      ) {
        return this.board[0][i];
      }
    }
    return null;
  }

  private winnerInDiagonal(): Player | null {
    const isWinnerInBackDiagonal = this.isThreeInARow(
      this.board[0][0],
      this.board[1][1],
      this.board[2][2],
    );
    const isWinnerInForwardDiagonal = this.isThreeInARow(
      this.board[0][2],
      this.board[1][1],
      this.board[2][0],
    );
    return isWinnerInBackDiagonal || isWinnerInForwardDiagonal
      ? this.board[1][1]
      : null;
  }

  private tieGame(): Player | null {
    const isBoardFull = this.board
      .map((row) =>
        row.map((sqr) => !!sqr.name).reduce((acc, cur) => acc && cur),
      )
      .reduce((acc, cur) => acc && cur);
    return isBoardFull ? tiePlayer : null;
  }

  private isThreeInARow(sq1: Player, sq2: Player, sq3: Player): boolean {
    return (
      !!sq1.name &&
      !!sq2.name &&
      !!sq3.name &&
      sq1.name === sq2.name &&
      sq1.name === sq3.name
    );
  }
}
