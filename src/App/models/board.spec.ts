import { lilo, stitch, tie } from "../constants/players";
import { Grid } from "../types";
import Board from "./board";

class BoardFixture extends Board {
  public constructor(grid: Grid) {
    super(grid);
  }
}

describe("create", () => {
  it("should return a Board with a null grid", () => {
    const board = Board.create();

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
    const board = Board.create();

    board.add(stitch, [0, 0]);

    expect(board.grid).toEqual(expected);
  });
});

describe("checkForWinner", () => {
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
    const board = new BoardFixture(b.grid);

    const winner = board.checkForWinner();

    expect(winner).toEqual(stitch);
  });

  it("should return null for no winner", () => {
    const board = new BoardFixture([
      [stitch, null, null],
      [null, null, stitch],
      [null, stitch, null],
    ]);

    const winner = board.checkForWinner();

    expect(winner).toBeNull();
  });

  it("should return tie when the board is full with no winner", () => {
    const board = new BoardFixture([
      [lilo, stitch, lilo],
      [stitch, stitch, lilo],
      [stitch, lilo, stitch],
    ]);

    const winner = board.checkForWinner();

    expect(winner).toEqual(tie);
  });
});

describe("isOccupiedAt", () => {
  let board: BoardFixture;
  beforeEach(() => {
    board = new BoardFixture([
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
