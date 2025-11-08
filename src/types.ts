import { Board } from "./models/board";
import { Player } from "./models/player";
import { GameStatus } from "./models/gameStatus";

export type Grid = (Player | null)[][];

export interface State {
  board: Board;
  status: GameStatus;
  player: Player;
  winner: Player | null;
}
