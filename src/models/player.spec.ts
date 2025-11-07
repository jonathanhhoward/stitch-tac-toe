import { describe, expect, it, Mocked, vi } from "vitest";
import { lilo, stitch } from "../constants/players";
import { Board } from "./board";
import { Coordinate } from "./coordinate.ts";
import { Player } from "./player";

describe("placeToken", () => {
  it("should add the player to the selected square on the board", () => {
    const player = new Player("name", "image");
    const board = {
      add: vi.fn() as Mocked<typeof Board.prototype.add>,
    } as Board;
    const position = new Coordinate(0, 0);

    player.selectSquare(board, position);

    expect(board.add).toHaveBeenCalledWith(player, position);
  });
});

describe("opponent", () => {
  it("lilo and stitch should be opponents", () => {
    expect(lilo.opponent()).toBe(stitch);
    expect(stitch.opponent()).toBe(lilo);
  });

  it("calling opponent on an unconfigured player should throw", () => {
    const p = new Player("X", "img");
    expect(() => p.opponent()).toThrow();
  });
});
