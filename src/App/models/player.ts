import { Coordinate } from "../types";
import Board from "./board";

export class Player {
  public readonly name: string;
  public readonly image: string;

  constructor(name: string, image: string) {
    this.image = image;
    this.name = name;
  }

  selectSquare(board: Board, position: Coordinate): void {
    board.add(this, position);
  }
}
