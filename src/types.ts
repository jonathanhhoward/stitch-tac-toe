import { Board } from "./models/board";
import { TurnStatus } from "./models/turnStatus.ts";
import { Player } from "./models/player";

export type Grid = (Player | null)[][];

export interface State {
  board: Board;
  status: TurnStatus;
  player: Player;
  winner: Player | null;
}
