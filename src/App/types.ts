import Board from "./models/board";

export interface Token {
  name: string;
  image: string;
}

export type Grid = (Token | null)[][];

export interface State {
  board: Board;
  gameStatus: string;
  token: Token;
  winner: Token;
}

type Row = number;
type Column = number;
export type Coordinate = [Row, Column];
