import { Board } from "./board";
import { Player } from "./player";
import { GameStatus } from "./gameStatus";

export class GameResult {
  readonly board: Board;
  readonly nextPlayer: Player;
  readonly winner: Player | null;
  readonly status: GameStatus;
  readonly changed: boolean;

  constructor(
    board: Board,
    nextPlayer: Player,
    winner: Player | null,
    status: GameStatus,
    changed = true,
  ) {
    this.status = status;
    this.winner = winner;
    this.nextPlayer = nextPlayer;
    this.board = board;
    this.changed = changed;
  }
}
