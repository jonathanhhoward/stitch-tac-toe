import { liloToken, stitchToken, tieToken } from "../constants/tokens";
import { Token } from "../types";
import Board from "./board";

class BoardFixture extends Board {
  public constructor(grid: (Token | null)[][]) {
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
  it("should add a token to the board grid", () => {
    const expected: (Token | null)[][] = [
      [stitchToken, null, null],
      [null, null, null],
      [null, null, null],
    ];
    const board = Board.create();

    board.add(stitchToken, [0, 0]);

    expect(board.grid).toEqual(expected);
  });
});

describe("checkForWinner", () => {
  it.each([
    {
      grid: [
        [stitchToken, stitchToken, stitchToken],
        [null, null, null],
        [null, null, null],
      ],
    },
    {
      grid: [
        [null, null, null],
        [stitchToken, stitchToken, stitchToken],
        [null, null, null],
      ],
    },
    {
      grid: [
        [null, null, null],
        [null, null, null],
        [stitchToken, stitchToken, stitchToken],
      ],
    },
    {
      grid: [
        [stitchToken, null, null],
        [stitchToken, null, null],
        [stitchToken, null, null],
      ],
    },
    {
      grid: [
        [null, stitchToken, null],
        [null, stitchToken, null],
        [null, stitchToken, null],
      ],
    },
    {
      grid: [
        [null, null, stitchToken],
        [null, null, stitchToken],
        [null, null, stitchToken],
      ],
    },
    {
      grid: [
        [stitchToken, null, null],
        [null, stitchToken, null],
        [null, null, stitchToken],
      ],
    },
    {
      grid: [
        [null, null, stitchToken],
        [null, stitchToken, null],
        [stitchToken, null, null],
      ],
    },
  ])("should return a winner for three in a row", (b) => {
    const board = new BoardFixture(b.grid);

    const winner = board.checkForWinner();

    expect(winner).toEqual(stitchToken);
  });

  it("should return null for no winner", () => {
    const board = new BoardFixture([
      [stitchToken, null, null],
      [null, null, stitchToken],
      [null, stitchToken, null],
    ]);

    const winner = board.checkForWinner();

    expect(winner).toBeNull();
  });

  it("should return tie when the board is full with no winner", () => {
    const board = new BoardFixture([
      [liloToken, stitchToken, liloToken],
      [stitchToken, stitchToken, liloToken],
      [stitchToken, liloToken, stitchToken],
    ]);

    const winner = board.checkForWinner();

    expect(winner).toEqual(tieToken);
  });
});

describe("isOccupiedAt", () => {
  let board: BoardFixture;
  beforeEach(() => {
    board = new BoardFixture([
      [null, null, null],
      [null, stitchToken, null],
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
