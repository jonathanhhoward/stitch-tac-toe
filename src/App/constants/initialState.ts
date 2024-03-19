import Board from "../models/board";
import { State } from "../types";
import { emptyPlayer, stitchPlayer } from "./players";

export const initialState: State = {
  board: Board.create(),
  gameStatus: "Stitch's turn",
  player: stitchPlayer,
  winner: emptyPlayer,
};
