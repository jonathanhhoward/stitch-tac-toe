import { Board } from "./board";
import { Player } from "./player";
import { GameStatus } from "./gameStatus";

export class GameResult {
  readonly board: Board;
  readonly nextPlayer: Player;
  readonly winner: Player | null;
  readonly status: GameStatus;

  constructor(
    board: Board,
    nextPlayer: Player,
    winner: Player | null,
    status: GameStatus,
  ) {
    this.status = status;
    this.winner = winner;
    this.nextPlayer = nextPlayer;
    this.board = board;
  }
}
