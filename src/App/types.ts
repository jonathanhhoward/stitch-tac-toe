import Board from "./models/board";

export interface Token {
  name: string;
  image: string;
}

export type Square = Token | null;
export type Grid = Square[][];

export interface State {
  board: Board;
  gameStatus: string;
  token: Token;
  winner: Square;
}

type Row = number;
type Column = number;
export type Coordinate = [Row, Column];
