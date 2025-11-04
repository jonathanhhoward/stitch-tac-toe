import { Board } from "./models/board";
import { Player } from "./models/player";

export type Grid = (Player | null)[][];

export interface State {
  board: Board;
  status: string;
  player: Player;
  winner: Player | null;
}

type Row = number;
type Column = number;

export class Coordinate {
  readonly row: Row;
  readonly col: Column;

  constructor(row: Row, col: Column) {
    if (!Number.isInteger(row) || !Number.isInteger(col)) {
      throw new Error("Coordinate row and col must be integers");
    }
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      throw new Error("Coordinate out of bounds");
    }

    this.row = row;
    this.col = col;
  }

  matches(row: number, col: number): boolean {
    return this.row === row && this.col === col;
  }
}
