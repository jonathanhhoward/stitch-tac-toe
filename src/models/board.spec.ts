import { beforeEach, describe, expect, it } from "vitest";
import { lilo, stitch, tie } from "../constants/players";
import { Grid } from "../types";
import { Board } from "./board";
import { Coordinate } from "./coordinate.ts";

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

describe("winner", () => {
  it.each([
    {
      grid: [
        [stitch, stitch, stitch],
        [null, null, null],
        [null, null, null],
      ],
    },
    {
      grid: [
        [null, null, null],
        [stitch, stitch, stitch],
        [null, null, null],
      ],
    },
    {
      grid: [
        [null, null, null],
        [null, null, null],
        [stitch, stitch, stitch],
      ],
    },
    {
      grid: [
        [stitch, null, null],
        [stitch, null, null],
        [stitch, null, null],
      ],
    },
    {
      grid: [
        [null, stitch, null],
        [null, stitch, null],
        [null, stitch, null],
      ],
    },
    {
      grid: [
        [null, null, stitch],
        [null, null, stitch],
        [null, null, stitch],
      ],
    },
    {
      grid: [
        [stitch, null, null],
        [null, stitch, null],
        [null, null, stitch],
      ],
    },
    {
      grid: [
        [null, null, stitch],
        [null, stitch, null],
        [stitch, null, null],
      ],
    },
  ])("should return a winner for three in a row", (b) => {
    const board = new Board(b.grid as Grid);

    const winner = board.winner();

    expect(winner).toEqual(stitch);
  });

  it("should return null for no winner", () => {
    const board = new Board([
      [stitch, null, null],
      [null, null, stitch],
      [null, stitch, null],
    ]);

    const winner = board.winner();

    expect(winner).toBeNull();
  });

  it("should return tie when the board is full with no winner", () => {
    const board = new Board([
      [lilo, stitch, lilo],
      [stitch, stitch, lilo],
      [stitch, lilo, stitch],
    ]);

    const winner = board.winner();

    expect(winner).toEqual(tie);
  });
});
