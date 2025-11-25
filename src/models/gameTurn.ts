import { State } from "../types.ts";
import { Board } from "./board";
import { Coordinate } from "./coordinate";
import { Player } from "./player";
import { TurnResult } from "./turnResult.ts";
import { TurnStatus } from "./turnStatus.ts";

export class GameTurn {
  readonly #state: State;
  readonly #board: Board;
  readonly #player: Player;
  readonly #position: Coordinate;

  constructor(state: State, position: Coordinate) {
    this.#state = state;
    this.#board = state.board;
    this.#player = state.player;
    this.#position = position;
  }

  result(): TurnResult {
    if (this.#board.isOccupiedAt(this.#position) || this.#state.winner) {
      return new TurnResult(
        this.#state.board,
        this.#state.player,
        this.#state.winner,
        this.#state.status,
      );
    }

    const newBoard = this.#player.selectSquare(this.#board, this.#position);

    return new TurnResult(
      newBoard,
      this.#player.opponent(),
      newBoard.winner(),
      TurnStatus.fromBoard(newBoard),
    );
  }
}
