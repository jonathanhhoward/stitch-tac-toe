import { beforeEach, describe, expect, it } from "vitest";
import { stitch } from "../constants/players";
import { Grid, Coordinate } from "../types";
import { Board } from "./board";

describe("empty", () => {
  it("should return a Board with a null grid", () => {
    const board = new Board();

    board.rows().forEach((row) => {
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

    const result = board.add(stitch, new Coordinate(0, 0));

    expect(result.rows()).toEqual(expected);
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
    const isOccupied = board.isOccupiedAt(new Coordinate(1, 1));

    expect(isOccupied).toBe(true);
  });

  it("should return false when a square contains null", () => {
    const isOccupied = board.isOccupiedAt(new Coordinate(0, 0));

    expect(isOccupied).toBe(false);
  });
});
