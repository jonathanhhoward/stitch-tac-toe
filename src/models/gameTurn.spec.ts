import { describe, expect, it } from "vitest";
import { lilo, stitch } from "../constants/players";
import { Board } from "./board";
import { Coordinate } from "./coordinate";
import { GameTurn } from "./gameTurn.ts";

describe("playTurn", () => {
  it("returns changed=false when the selected position is already occupied", () => {
    const board = new Board([
      [stitch, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    const gameTurn = new GameTurn(board, stitch, new Coordinate(0, 0));

    const result = gameTurn.execute();

    expect(result.changed).toBe(false);
    expect(result.board).toBe(board);
    expect(result.nextPlayer).toBe(stitch);
  });

  it("returns changed=false when the board already has a winner", () => {
    const board = new Board([
      [stitch, stitch, stitch],
      [null, null, null],
      [null, null, null],
    ]);
    const gameTurn = new GameTurn(board, stitch, new Coordinate(1, 0));

    const result = gameTurn.execute();

    expect(result.changed).toBe(false);
    expect(result.board).toBe(board);
    expect(result.winner).toBe(stitch);
  });

  it("returns changed=true and updates board for a normal move", () => {
    const board = new Board();
    const gameTurn = new GameTurn(board, stitch, new Coordinate(0, 0));

    const result = gameTurn.execute();

    expect(result.changed).toBe(true);
    expect(result.board).not.toBe(board);
    expect(result.board.rows()[0][0]).toBe(stitch);
    expect(result.nextPlayer).toBe(lilo);
  });
});
