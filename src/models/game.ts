import { lilo, stitch, tie } from "../constants/players";
import { Board } from "./board";
import { Player } from "./player";

export class Game {
  nextPlayer(currentPlayer: Player): Player {
    return currentPlayer === stitch ? lilo : stitch;
  }

  status(player: Player, winner: Player | null): string {
    return winner
      ? winner === tie
        ? "Tie!"
        : `${winner.name} wins!`
      : `${player.name}'s turn`;
  }

  checkForWinner(board: Board): Player | null {
    for (let i = 0; i < 3; ++i) {
      if (this.#isWinnerInRow(board, i) || this.#isWinnerInColumn(board, i)) {
        return board.getAt([i, i]);
      }
    }

    // prettier-ignore
    if (this.#isWinnerInBackDiagonal(board) || this.#isWinnerInForwardDiagonal(board)) {
      return board.getAt([1, 1]);
    }

    if (this.#isFull(board)) {
      return tie;
    }

    return null;
  }

  #isWinnerInRow(board: Board, row: number) {
    return this.#isThreeInARow(
      board.getAt([row, 0]),
      board.getAt([row, 1]),
      board.getAt([row, 2]),
    );
  }

  #isWinnerInColumn(board: Board, col: number) {
    return this.#isThreeInARow(
      board.getAt([0, col]),
      board.getAt([1, col]),
      board.getAt([2, col]),
    );
  }

  #isWinnerInBackDiagonal(board: Board) {
    return this.#isThreeInARow(
      board.getAt([0, 0]),
      board.getAt([1, 1]),
      board.getAt([2, 2]),
    );
  }

  #isWinnerInForwardDiagonal(board: Board) {
    return this.#isThreeInARow(
      board.getAt([0, 2]),
      board.getAt([1, 1]),
      board.getAt([2, 0]),
    );
  }

  #isFull(board: Board) {
    return board
      .rows()
      .flat()
      .every((square) => !!square);
  }

  #isThreeInARow(sq1: Player | null, sq2: Player | null, sq3: Player | null) {
    return !!sq1 && sq1 === sq2 && sq1 === sq3;
  }
}
