import { Board } from "../models/board";
import { TurnStatus } from "../models/turnStatus.ts";
import { State } from "../types";
import { stitch } from "./players";

export const initialState = (): State => {
  const board = new Board();

  return {
    board,
    status: TurnStatus.fromBoard(board),
    player: stitch,
    winner: null,
  };
};
