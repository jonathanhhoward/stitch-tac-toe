import { Board } from "./board";
import { TurnStatus } from "./turnStatus.ts";
import { Player } from "./player";

export class TurnResult {
  readonly board: Board;
  readonly nextPlayer: Player;
  readonly winner: Player | null;
  readonly status: TurnStatus;
  readonly changed: boolean;

  constructor(
    board: Board,
    nextPlayer: Player,
    winner: Player | null,
    status: TurnStatus,
    changed = true,
  ) {
    this.status = status;
    this.winner = winner;
    this.nextPlayer = nextPlayer;
    this.board = board;
    this.changed = changed;
  }
}
