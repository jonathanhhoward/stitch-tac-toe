import { describe, expect, it } from "vitest";
import { lilo, stitch } from "../constants/players";
import { State } from "../types.ts";
import { Board } from "./board";
import { Coordinate } from "./coordinate";
import { GameTurn } from "./gameTurn.ts";
import { TurnStatus } from "./turnStatus.ts";

describe("result", () => {
  it("returns state unchanged when the selected position is already occupied", () => {
    const board = new Board([
      [stitch, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    const state: State = {
      board,
      player: lilo,
      winner: null,
      status: TurnStatus.fromBoard(board),
    };
    const gameTurn = new GameTurn(state, new Coordinate(0, 0));

    const result = gameTurn.result();

    expect(result).toEqual(state);
  });

  it("returns state unchanged when there is already a winner", () => {
    const board = new Board();
    const state: State = {
      board,
      player: stitch,
      winner: lilo,
      status: TurnStatus.fromBoard(board),
    };
    const gameTurn = new GameTurn(state, new Coordinate(0, 0));

    const result = gameTurn.result();

    expect(result).toEqual(state);
  });

  it("returns updated state for a normal move", () => {
    const board = new Board();
    const state: State = {
      board,
      player: stitch,
      winner: null,
      status: TurnStatus.fromBoard(board),
    };
    const gameTurn = new GameTurn(state, new Coordinate(0, 0));

    const result = gameTurn.result();

    expect(result).not.toEqual(state);
  });
});
