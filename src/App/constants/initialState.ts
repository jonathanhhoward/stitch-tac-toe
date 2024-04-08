import Board from "../models/board";
import { Player } from "../models/player";
import { State } from "../types";
import { stitchToken } from "./tokens";

export const initialState = (): State => ({
  board: Board.create(),
  gameStatus: "Stitch's turn",
  player: new Player(stitchToken),
  token: stitchToken,
  winner: null,
});
