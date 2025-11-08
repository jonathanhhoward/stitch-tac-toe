import { describe, expect, it } from "vitest";
import { lilo, stitch } from "../constants/players";
import { Board } from "./board";
import { Game } from "./game";
import { Player } from "./player.ts";

describe("nextPlayer", () => {
  it.each([
    [stitch, lilo],
    [lilo, stitch],
  ])("should alternate players", (player1, player2) => {
    const game = new Game();

    const next = game.nextPlayer(player1);

    expect(next).toEqual(player2);
  });
});

// Replace legacy status tests with tests that call statusForBoard without conditionals
describe("statusForBoard (behavior)", () => {
  const cases: Array<[Player, Board, string]> = [
    [
      lilo,
      new Board([
        [stitch, stitch, stitch],
        [null, null, null],
        [null, null, null],
      ]),
      "Stitch wins!",
    ],
    [
      stitch,
      new Board([
        [lilo, lilo, lilo],
        [null, null, null],
        [null, null, null],
      ]),
      "Lilo wins!",
    ],
    [
      lilo,
      new Board([
        [lilo, stitch, lilo],
        [stitch, stitch, lilo],
        [stitch, lilo, stitch],
      ]),
      "Tie!",
    ],
    [stitch, new Board(), "Stitch's turn"],
  ];

  it.each(cases)(
    "should return the correct status",
    (player, board, status) => {
      const game = new Game();

      const result = game.statusForBoard(board, player);

      expect(result).toEqual(status);
    },
  );
});

// New tests to assert modern API delegates to Board
describe("statusForBoard (delegation)", () => {
  it("should return the same status as Board.statusFor for an empty board", () => {
    const game = new Game();
    const board = new Board();

    const expected = board.statusFor(stitch);
    const actual = game.statusForBoard(board, stitch);

    expect(actual).toEqual(expected);
  });

  it("should return the same status as Board.statusFor when there is a winner", () => {
    const game = new Game();
    const board = new Board([
      [stitch, stitch, stitch],
      [null, null, null],
      [null, null, null],
    ]);

    const expected = board.statusFor(lilo);
    const actual = game.statusForBoard(board, lilo);

    expect(actual).toEqual(expected);
  });
});
