import { Board } from "../models/board";
import { State } from "../types";
import { stitch } from "./players";
import { GameStatus } from "../models/gameStatus";

export const initialState = (): State => {
  const board = new Board();

  return {
    board,
    status: GameStatus.fromBoard(board),
    player: stitch,
    winner: null,
  };
};
