import { describe, expect, it, Mocked, vi } from "vitest";
import { Coordinate } from "../types";
import Board from "./board";
import { Player } from "./player";

describe("placeToken", () => {
  it("should add the player to the selected square on the board", () => {
    const player = new Player("name", "image");
    const board = {
      add: vi.fn() as Mocked<typeof Board.prototype.add>,
    } as Board;
    const position: Coordinate = [0, 0];

    player.selectSquare(board, position);

    expect(board.add).toHaveBeenCalledWith(player, position);
  });
});
