import { Board } from "./board";
import { Coordinate } from "./coordinate";
import { TurnResult } from "./turnResult.ts";
import { TurnStatus } from "./turnStatus.ts";
import { Player } from "./player";

export class GameTurn {
  readonly #board: Board;
  readonly #player: Player;
  readonly #position: Coordinate;

  constructor(board: Board, player: Player, position: Coordinate) {
    this.#board = board;
    this.#player = player;
    this.#position = position;
  }

  result(): TurnResult {
    const currentWinner = this.#board.winner();

    if (this.#board.isOccupiedAt(this.#position) || currentWinner) {
      const status = TurnStatus.fromBoard(this.#board);
      return new TurnResult(
        this.#board,
        this.#player,
        currentWinner,
        status,
        false,
      );
    }

    const newBoard = this.#player.selectSquare(this.#board, this.#position);

    return new TurnResult(
      newBoard,
      this.#player.opponent(),
      newBoard.winner(),
      TurnStatus.fromBoard(newBoard),
      true,
    );
  }
}
