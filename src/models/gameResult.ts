import { Board } from "./board";
import { Player } from "./player";

export class GameResult {
  readonly board: Board;
  readonly nextPlayer: Player;
  readonly winner: Player | null;
  readonly status: string;

  constructor(
    board: Board,
    nextPlayer: Player,
    winner: Player | null,
    status: string,
  ) {
    this.status = status;
    this.winner = winner;
    this.nextPlayer = nextPlayer;
    this.board = board;
  }
}
