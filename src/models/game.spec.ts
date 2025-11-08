import { describe, expect, it } from "vitest";
import { lilo, stitch, tie } from "../constants/players";
import { Game } from "./game";
import { Board } from "./board";

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

// Replace legacy status tests with tests that call statusForBoard
describe("statusForBoard (behavior)", () => {
  it.each([
    [lilo, stitch, "Stitch wins!"],
    [stitch, lilo, "Lilo wins!"],
    [lilo, tie, "Tie!"],
    [stitch, null, "Stitch's turn"],
  ])("should return the correct status", (player, winner, status) => {
    const game = new Game();
    let board: Board;

    if (winner === null) {
      board = new Board();
    } else if (winner === tie) {
      board = new Board([
        [lilo, stitch, lilo],
        [stitch, stitch, lilo],
        [stitch, lilo, stitch],
      ]);
    } else {
      // winner is stitch or lilo: construct a simple 3-in-a-row for that winner
      const win = winner;
      board = new Board([
        [win, win, win],
        [null, null, null],
        [null, null, null],
      ]);
    }

    const result = game.statusForBoard(board, player);

    expect(result).toEqual(status);
  });
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
