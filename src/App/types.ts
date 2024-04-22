import Board from "./models/board";
import { Player } from "./models/player";

export type Square = Player | null;
export type Grid = Square[][];

export interface State {
  board: Board;
  gameStatus: string;
  player: Player;
  winner: Player | null;
}

type Row = number;
type Column = number;
export type Coordinate = [Row, Column];
