import { Coordinate, Token } from "../types";
import Board from "./board";

export class Player {
  constructor(public readonly token: Token) {}

  placeToken(board: Board, position: Coordinate): void {
    board.add(this, position);
  }
}
