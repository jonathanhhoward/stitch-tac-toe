import Board from "../models/board";
import { State } from "../types";
import { emptyPlayer, stitchPlayer } from "./players";

export const initialState: State = {
  board: Board.create(),
  player: stitchPlayer,
  winner: emptyPlayer,
};
