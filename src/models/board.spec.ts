import { beforeEach, describe, expect, it } from "vitest";
import { stitch } from "../constants/players";
import { Grid } from "../types";
import { Board } from "./board";

describe("empty", () => {
  it("should return a Board with a null grid", () => {
    const board = new Board();

    board.grid.forEach((row) => {
      row.forEach((square) => {
        expect(square).toBeNull();
      });
    });
  });
});

describe("add", () => {
  it("should add a player to the board grid", () => {
    const expected: Grid = [
      [stitch, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const board = new Board();

    board.add(stitch, [0, 0]);

    expect(board.grid).toEqual(expected);
  });
});

describe("isOccupiedAt", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board([
      [null, null, null],
      [null, stitch, null],
      [null, null, null],
    ]);
  });

  it("should return true when a square contains a Token", () => {
    const isOccupied = board.isOccupiedAt([1, 1]);

    expect(isOccupied).toBe(true);
  });

  it("should return false when a square contains null", () => {
    const isOccupied = board.isOccupiedAt([0, 0]);

    expect(isOccupied).toBe(false);
  });
});
