import { Board } from "./board";
import { Coordinate } from "./coordinate";
import { GameResult } from "./gameResult";
import { GameStatus } from "./gameStatus";
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

  result(): GameResult {
    const currentWinner = this.#board.winner();

    if (this.#board.isOccupiedAt(this.#position) || currentWinner) {
      const status = GameStatus.fromBoard(this.#board);
      return new GameResult(
        this.#board,
        this.#player,
        currentWinner,
        status,
        false,
      );
    }

    const newBoard = this.#player.selectSquare(this.#board, this.#position);

    return new GameResult(
      newBoard,
      this.#player.opponent(),
      newBoard.winner(),
      GameStatus.fromBoard(newBoard),
      true,
    );
  }
}
