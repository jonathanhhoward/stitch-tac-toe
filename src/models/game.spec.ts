import { describe, expect, it } from "vitest";
import { lilo, stitch } from "../constants/players";
import { Board } from "./board";
import { Coordinate } from "./coordinate";
import { Game } from "./game";

describe("nextPlayer", () => {
  it.each([
    [stitch, lilo],
    [lilo, stitch],
  ])("should alternate players", (player1, player2) => {
    const game = new Game();

    const next = game.nextPlayer(player1);

    expect(next).toEqual(player2);
  });
});

describe("playTurn (changed flag)", () => {
  it("returns changed=false when the selected position is already occupied", () => {
    const game = new Game();
    const board = new Board([
      [stitch, null, null],
      [null, null, null],
      [null, null, null],
    ]);

    const result = game.playTurn(board, stitch, new Coordinate(0, 0));

    expect(result.changed).toBe(false);
    expect(result.board).toBe(board);
    expect(result.nextPlayer).toBe(stitch);
  });

  it("returns changed=false when the board already has a winner", () => {
    const game = new Game();
    const board = new Board([
      [stitch, stitch, stitch],
      [null, null, null],
      [null, null, null],
    ]);

    const result = game.playTurn(board, stitch, new Coordinate(1, 0));

    expect(result.changed).toBe(false);
    expect(result.board).toBe(board);
    expect(result.winner).toBe(stitch);
  });

  it("returns changed=true and updates board for a normal move", () => {
    const game = new Game();
    const board = new Board();

    const result = game.playTurn(board, stitch, new Coordinate(0, 0));

    expect(result.changed).toBe(true);
    expect(result.board).not.toBe(board);
    expect(result.board.rows()[0][0]).toBe(stitch);
    expect(result.nextPlayer).toBe(lilo);
  });
});
