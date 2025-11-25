import { tie } from "../constants/players";
import { Board } from "./board";
import { Player } from "./player";

export class TurnStatus {
  readonly #winner: Player | null;

  constructor(winner: Player | null) {
    this.#winner = winner;
    Object.freeze(this);
  }

  static fromBoard(board: Board): TurnStatus {
    return new TurnStatus(board.winner());
  }

  toString(nextPlayer?: Player): string {
    if (this.#winner) {
      return this.#winner === tie ? "Tie!" : `${this.#winner.name} wins!`;
    }

    if (!nextPlayer) {
      throw new Error("nextPlayer is required when there is no winner");
    }

    return `${nextPlayer.name}'s turn`;
  }
}
