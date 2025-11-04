import { Board } from "./models/board";
import { Player } from "./models/player";

export type Grid = (Player | null)[][];

export interface State {
  board: Board;
  status: string;
  player: Player;
  winner: Player | null;
}
