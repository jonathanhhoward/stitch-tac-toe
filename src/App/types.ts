import Board from "./models/board";
import { Player } from "./models/player";

export interface Token {
  name: string;
  image: string;
}

export type Square = Token | null;
export type Grid = Square[][];

export interface State {
  board: Board;
  gameStatus: string;
  player: Player;
  token: Token;
  winner: Player | null;
}

type Row = number;
type Column = number;
export type Coordinate = [Row, Column];
