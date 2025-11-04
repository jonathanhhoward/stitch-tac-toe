import { describe, expect, it, Mocked, vi } from "vitest";
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
