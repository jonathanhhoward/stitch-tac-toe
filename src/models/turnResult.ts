import { Board } from "./board";
import { Player } from "./player";
import { TurnStatus } from "./turnStatus.ts";

export class TurnResult {
  readonly board: Board;
  readonly player: Player;
  readonly winner: Player | null;
  readonly status: TurnStatus;

  constructor(
    board: Board,
    player: Player,
    winner: Player | null,
    status: TurnStatus,
  ) {
    this.status = status;
    this.winner = winner;
    this.player = player;
    this.board = board;
    Object.freeze(this);
  }
}
