export interface Player {
  name: string;
  image: string;
}

export type Board = Player[][];

export interface State {
  board: Board;
  player: Player;
  winner: Player;
}

type Row = number;
type Column = number;
export type Coordinate = [Row, Column];
