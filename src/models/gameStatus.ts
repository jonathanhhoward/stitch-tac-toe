// ...existing code...
import { Player } from "./player";
import { Board } from "./board";
import { tie } from "../constants/players";

export class GameStatus {
  readonly winner: Player | null;

  constructor(winner: Player | null) {
    this.winner = winner;
  }

  static fromBoard(board: Board): GameStatus {
    return new GameStatus(board.winner());
  }

  isTie(): boolean {
    return this.winner === tie;
  }

  toString(nextPlayer?: Player): string {
    if (this.winner) {
      return this.isTie() ? "Tie!" : `${this.winner.name} wins!`;
    }

    if (!nextPlayer) {
      throw new Error("nextPlayer is required when there is no winner");
    }

    return `${nextPlayer.name}'s turn`;
  }
}
