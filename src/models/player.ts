import { Board } from "./board";
import { Coordinate } from "./coordinate.ts";

export class Player {
  readonly name: string;
  readonly image: string;
  #opponent?: Player;

  constructor(name: string, image: string) {
    this.image = image;
    this.name = name;
  }

  setOpponent(opponent: Player): void {
    this.#opponent = opponent;
  }

  opponent(): Player {
    if (!this.#opponent) {
      throw new Error("Opponent not set for Player");
    }
    return this.#opponent;
  }

  selectSquare(board: Board, position: Coordinate): Board {
    return board.add(this, position);
  }
}
