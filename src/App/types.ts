import Board from "./models/board";
import { Player } from "./models/player";

export type Grid = (Player | null)[][];

export interface State {
  board: Board;
  gameStatus: string;
  player: Player;
  winner: Player | null;
}

type Row = number;
type Column = number;
export type Coordinate = [Row, Column];
