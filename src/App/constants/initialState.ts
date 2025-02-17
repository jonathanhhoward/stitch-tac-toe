import Board from "../models/board";
import { State } from "../types";
import { stitch } from "./players";

export const initialState = (): State => ({
  board: Board.empty(),
  gameStatus: "Stitch's turn",
  player: stitch,
  winner: null,
});
