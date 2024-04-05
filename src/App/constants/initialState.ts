import Board from "../models/board";
import { State } from "../types";
import { stitchToken } from "./tokens";

export const initialState = (): State => ({
  board: Board.create(),
  gameStatus: "Stitch's turn",
  token: stitchToken,
  winner: null,
});
