import { Board } from "./board";
import { Coordinate } from "./coordinate.ts";

export class Player {
  readonly name: string;
  readonly image: string;

  constructor(name: string, image: string) {
    this.image = image;
    this.name = name;
  }

  selectSquare(board: Board, position: Coordinate): Board {
    return board.add(this, position);
  }
}
