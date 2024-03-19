import Board from "./models/board";

export interface Player {
  name: string;
  token: string;
}

export type PlayerGrid = Player[][];

export interface State {
  board: Board;
  gameStatus: string;
  player: Player;
  winner: Player;
}

type Row = number;
type Column = number;
export type Coordinate = [Row, Column];
