import { Board } from "./models/board";
import { GameStatus } from "./models/gameStatus";
import { Player } from "./models/player";

export type Grid = (Player | null)[][];

export interface State {
  board: Board;
  status: GameStatus;
  player: Player;
  winner: Player | null;
}
