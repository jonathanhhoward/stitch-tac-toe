import { lilo, stitch, tie } from "../constants/players";
import { Board } from "./board";
import { Player } from "./player";

export class Game {
  static nextPlayer(currentPlayer: Player): Player {
    return currentPlayer === stitch ? lilo : stitch;
  }

  static status(player: Player, winner: Player | null): string {
    return winner
      ? winner === tie
        ? "Tie!"
        : `${winner.name} wins!`
      : `${player.name}'s turn`;
  }

  static checkForWinner(board: Board): Player | null {
    for (let i = 0; i < 3; ++i) {
      if (this.#isWinnerInRow(board, i) || this.#isWinnerInColumn(board, i)) {
        return board.grid[i][i];
      }
    }

    // prettier-ignore
    if (this.#isWinnerInBackDiagonal(board) || this.#isWinnerInForwardDiagonal(board)) {
      return board.grid[1][1];
    }

    if (this.#isFull(board)) {
      return tie;
    }

    return null;
  }

  static #isWinnerInRow(board: Board, row: number) {
    return this.#isThreeInARow(
      board.grid[row][0],
      board.grid[row][1],
      board.grid[row][2],
    );
  }

  static #isWinnerInColumn(board: Board, col: number) {
    return this.#isThreeInARow(
      board.grid[0][col],
      board.grid[1][col],
      board.grid[2][col],
    );
  }

  static #isWinnerInBackDiagonal(board: Board) {
    return this.#isThreeInARow(
      board.grid[0][0],
      board.grid[1][1],
      board.grid[2][2],
    );
  }

  static #isWinnerInForwardDiagonal(board: Board) {
    return this.#isThreeInARow(
      board.grid[0][2],
      board.grid[1][1],
      board.grid[2][0],
    );
  }

  static #isFull(board: Board) {
    // prettier-ignore
    return board.grid.reduce(
      (rowAcc, rowCur) => rowAcc && rowCur.reduce(
        (tokenAcc, tokenCur) => tokenAcc && !!tokenCur,
        true
      ),
      true
    );
  }

  static #isThreeInARow(
    sq1: Player | null,
    sq2: Player | null,
    sq3: Player | null,
  ) {
    return !!sq1 && !!sq2 && !!sq3 && sq1 === sq2 && sq1 === sq3;
  }
}
