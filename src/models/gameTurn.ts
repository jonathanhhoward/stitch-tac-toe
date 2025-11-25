import { State } from "../types.ts";
import { Coordinate } from "./coordinate";
import { TurnResult } from "./turnResult.ts";
import { TurnStatus } from "./turnStatus.ts";

export class GameTurn {
  readonly #state: State;
  readonly #position: Coordinate;

  constructor(state: State, position: Coordinate) {
    this.#state = state;
    this.#position = position;
    Object.freeze(this);
  }

  result(): TurnResult {
    const { board, player, winner } = this.#state;
    if (board.isOccupiedAt(this.#position) || winner) {
      return this.#state;
    }

    const newBoard = player.selectSquare(board, this.#position);

    return new TurnResult(
      newBoard,
      player.opponent(),
      newBoard.winner(),
      TurnStatus.fromBoard(newBoard),
    );
  }
}
