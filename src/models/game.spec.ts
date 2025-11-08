import { describe, expect, it } from "vitest";
import { lilo, stitch } from "../constants/players";
import { Board } from "./board";
import { Coordinate } from "./coordinate";
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

describe("playTurn (changed flag)", () => {
  it("returns changed=false when the selected position is already occupied", () => {
    const game = new Game();
    const board = new Board([
      [stitch, null, null],
      [null, null, null],
      [null, null, null],
    ]);

    const result = game.playTurn(board, stitch, new Coordinate(0, 0));

    expect(result.changed).toBe(false);
    expect(result.board).toBe(board);
    expect(result.nextPlayer).toBe(stitch);
  });

  it("returns changed=false when the board already has a winner", () => {
    const game = new Game();
    const board = new Board([
      [stitch, stitch, stitch],
      [null, null, null],
      [null, null, null],
    ]);

    const result = game.playTurn(board, stitch, new Coordinate(1, 0));

    expect(result.changed).toBe(false);
    expect(result.board).toBe(board);
    expect(result.winner).toBe(stitch);
  });

  it("returns changed=true and updates board for a normal move", () => {
    const game = new Game();
    const board = new Board();

    const result = game.playTurn(board, stitch, new Coordinate(0, 0));

    expect(result.changed).toBe(true);
    expect(result.board).not.toBe(board);
    expect(result.board.rows()[0][0]).toBe(stitch);
    expect(result.nextPlayer).toBe(lilo);
  });
});
