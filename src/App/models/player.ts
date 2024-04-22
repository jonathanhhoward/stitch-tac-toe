import { Coordinate } from "../types";
import Board from "./board";

export class Player {
  constructor(
    public readonly name: string,
    public readonly image: string,
  ) {}

  placeToken(board: Board, position: Coordinate): void {
    board.add(this, position);
  }
}
