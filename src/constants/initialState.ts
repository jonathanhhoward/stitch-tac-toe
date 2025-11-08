import { Board } from "../models/board";
import { GameStatus } from "../models/gameStatus";
import { State } from "../types";
import { stitch } from "./players";

export const initialState = (): State => {
  const board = new Board();

  return {
    board,
    status: GameStatus.fromBoard(board),
    player: stitch,
    winner: null,
  };
};
