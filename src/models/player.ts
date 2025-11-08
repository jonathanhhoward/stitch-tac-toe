import { Board } from "./board";
import { Coordinate } from "./coordinate.ts";

export class Player {
  readonly name: string;
  readonly image: string;
  // opponent can be provided directly or via a supplier to handle circular construction
  #opponentSupplier?: Player | (() => Player);

  constructor(name: string, image: string, opponent?: Player | (() => Player)) {
    this.image = image;
    this.name = name;
    this.#opponentSupplier = opponent;
  }

  opponent(): Player {
    if (!this.#opponentSupplier) {
      throw new Error("Opponent not set for Player");
    }

    if (typeof this.#opponentSupplier === "function") {
      // resolve supplier
      const resolved = (this.#opponentSupplier as () => Player)();
      // cache the resolved player so subsequent calls are direct
      this.#opponentSupplier = resolved;
      return resolved;
    }

    return this.#opponentSupplier as Player;
  }

  selectSquare(board: Board, position: Coordinate): Board {
    return board.add(this, position);
  }
}
