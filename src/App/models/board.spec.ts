import {
  emptyToken,
  liloToken,
  stitchToken,
  tieToken,
} from "../constants/tokens";
import { Token } from "../types";
import Board from "./board";

class BoardFixture extends Board {
  public constructor(grid: Token[][]) {
    super(grid);
  }
}

describe("create", () => {
  it("should return a Board filled with empty players", () => {
    const board = Board.create();

    board.grid.forEach((row) => {
      row.forEach((square) => {
        expect(square).toEqual(emptyToken);
      });
    });
  });
});

describe("add", () => {
  it("should add a token to the board grid", () => {
    const expected: Token[][] = [
      [stitchToken, emptyToken, emptyToken],
      [emptyToken, emptyToken, emptyToken],
      [emptyToken, emptyToken, emptyToken],
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
        [emptyToken, emptyToken, emptyToken],
        [emptyToken, emptyToken, emptyToken],
      ],
    },
    {
      grid: [
        [emptyToken, emptyToken, emptyToken],
        [stitchToken, stitchToken, stitchToken],
        [emptyToken, emptyToken, emptyToken],
      ],
    },
    {
      grid: [
        [emptyToken, emptyToken, emptyToken],
        [emptyToken, emptyToken, emptyToken],
        [stitchToken, stitchToken, stitchToken],
      ],
    },
    {
      grid: [
        [stitchToken, emptyToken, emptyToken],
        [stitchToken, emptyToken, emptyToken],
        [stitchToken, emptyToken, emptyToken],
      ],
    },
    {
      grid: [
        [emptyToken, stitchToken, emptyToken],
        [emptyToken, stitchToken, emptyToken],
        [emptyToken, stitchToken, emptyToken],
      ],
    },
    {
      grid: [
        [emptyToken, emptyToken, stitchToken],
        [emptyToken, emptyToken, stitchToken],
        [emptyToken, emptyToken, stitchToken],
      ],
    },
    {
      grid: [
        [stitchToken, emptyToken, emptyToken],
        [emptyToken, stitchToken, emptyToken],
        [emptyToken, emptyToken, stitchToken],
      ],
    },
    {
      grid: [
        [emptyToken, emptyToken, stitchToken],
        [emptyToken, stitchToken, emptyToken],
        [stitchToken, emptyToken, emptyToken],
      ],
    },
  ])("should return a winner for three in a row", (b) => {
    const board = new BoardFixture(b.grid);

    const winner = board.checkForWinner();

    expect(winner).toEqual(stitchToken);
  });

  it("should return empty for no winner", () => {
    const board = new BoardFixture([
      [stitchToken, emptyToken, emptyToken],
      [emptyToken, emptyToken, stitchToken],
      [emptyToken, stitchToken, emptyToken],
    ]);

    const winner = board.checkForWinner();

    expect(winner).toEqual(emptyToken);
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
      [emptyToken, emptyToken, emptyToken],
      [emptyToken, stitchToken, emptyToken],
      [emptyToken, emptyToken, emptyToken],
    ]);
  });

  it("should return true when a square is not empty", () => {
    const isOccupied = board.isOccupiedAt([1, 1]);

    expect(isOccupied).toBe(true);
  });

  it("should return false when a square is empty", () => {
    const isOccupied = board.isOccupiedAt([0, 0]);

    expect(isOccupied).toBe(false);
  });
});
