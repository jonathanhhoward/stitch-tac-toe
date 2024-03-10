import {
  emptyPlayer,
  liloPlayer,
  stitchPlayer,
  tiePlayer,
} from "../constants/players";
import { Player } from "../types";
import Board from "./board";

class BoardFixture extends Board {
  public constructor(grid: Player[][]) {
    super(grid);
  }
}

describe("create", () => {
  it("should return a Board filled with empty players", () => {
    const board = Board.create();

    board.grid.forEach((row) => {
      row.forEach((square) => {
        expect(square).toEqual(emptyPlayer);
      });
    });
  });
});

describe("add", () => {
  it("should return a new board with the player added", () => {
    const expected: Player[][] = [
      [stitchPlayer, emptyPlayer, emptyPlayer],
      [emptyPlayer, emptyPlayer, emptyPlayer],
      [emptyPlayer, emptyPlayer, emptyPlayer],
    ];

    const board = Board.create().add(stitchPlayer, [0, 0]);

    expect(board.grid).toEqual(expected);
  });
});

describe("checkForWinner", () => {
  it.each([
    {
      grid: [
        [stitchPlayer, stitchPlayer, stitchPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
      ],
    },
    {
      grid: [
        [emptyPlayer, emptyPlayer, emptyPlayer],
        [stitchPlayer, stitchPlayer, stitchPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
      ],
    },
    {
      grid: [
        [emptyPlayer, emptyPlayer, emptyPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
        [stitchPlayer, stitchPlayer, stitchPlayer],
      ],
    },
    {
      grid: [
        [stitchPlayer, emptyPlayer, emptyPlayer],
        [stitchPlayer, emptyPlayer, emptyPlayer],
        [stitchPlayer, emptyPlayer, emptyPlayer],
      ],
    },
    {
      grid: [
        [emptyPlayer, stitchPlayer, emptyPlayer],
        [emptyPlayer, stitchPlayer, emptyPlayer],
        [emptyPlayer, stitchPlayer, emptyPlayer],
      ],
    },
    {
      grid: [
        [emptyPlayer, emptyPlayer, stitchPlayer],
        [emptyPlayer, emptyPlayer, stitchPlayer],
        [emptyPlayer, emptyPlayer, stitchPlayer],
      ],
    },
    {
      grid: [
        [stitchPlayer, emptyPlayer, emptyPlayer],
        [emptyPlayer, stitchPlayer, emptyPlayer],
        [emptyPlayer, emptyPlayer, stitchPlayer],
      ],
    },
    {
      grid: [
        [emptyPlayer, emptyPlayer, stitchPlayer],
        [emptyPlayer, stitchPlayer, emptyPlayer],
        [stitchPlayer, emptyPlayer, emptyPlayer],
      ],
    },
  ])("should return a winner for three in a row", (b) => {
    const board = new BoardFixture(b.grid);

    const winner = board.checkForWinner();

    expect(winner).toEqual(stitchPlayer);
  });

  it("should return empty for no winner", () => {
    const board = new BoardFixture([
      [stitchPlayer, emptyPlayer, emptyPlayer],
      [emptyPlayer, emptyPlayer, stitchPlayer],
      [emptyPlayer, stitchPlayer, emptyPlayer],
    ]);

    const winner = board.checkForWinner();

    expect(winner).toEqual(emptyPlayer);
  });

  it("should return tie when the board is full with no winner", () => {
    const board = new BoardFixture([
      [liloPlayer, stitchPlayer, liloPlayer],
      [stitchPlayer, stitchPlayer, liloPlayer],
      [stitchPlayer, liloPlayer, stitchPlayer],
    ]);

    const winner = board.checkForWinner();

    expect(winner).toEqual(tiePlayer);
  });
});

describe("isOccupiedAt", () => {
  let board: BoardFixture;
  beforeEach(() => {
    board = new BoardFixture([
      [emptyPlayer, emptyPlayer, emptyPlayer],
      [emptyPlayer, stitchPlayer, emptyPlayer],
      [emptyPlayer, emptyPlayer, emptyPlayer],
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
