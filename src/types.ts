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
    this.row = row;
    this.col = col;
  }
}
