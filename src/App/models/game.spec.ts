import { describe, expect, it } from "vitest";
import { lilo, stitch, tie } from "../constants/players";
import { Board } from "./board";
import { Game } from "./game";

describe("nextPlayer", () => {
  it.each([
    [stitch, lilo],
    [lilo, stitch],
  ])("should alternate players", (player1, player2) => {
    const next = Game.nextPlayer(player1);

    expect(next).toEqual(player2);
  });
});

describe("status", () => {
  it.each([
    [lilo, stitch, "Stitch wins!"],
    [stitch, lilo, "Lilo wins!"],
    [lilo, tie, "Tie!"],
    [stitch, null, "Stitch's turn"],
  ])("should return the correct status", (player, winner, status) => {
    const result = Game.status(player, winner);

    expect(result).toEqual(status);
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
    const board = new Board(b.grid);

    const winner = Game.checkForWinner(board);

    expect(winner).toEqual(stitch);
  });

  it("should return null for no winner", () => {
    const board = new Board([
      [stitch, null, null],
      [null, null, stitch],
      [null, stitch, null],
    ]);

    const winner = Game.checkForWinner(board);

    expect(winner).toBeNull();
  });

  it("should return tie when the board is full with no winner", () => {
    const board = new Board([
      [lilo, stitch, lilo],
      [stitch, stitch, lilo],
      [stitch, lilo, stitch],
    ]);

    const winner = Game.checkForWinner(board);

    expect(winner).toEqual(tie);
  });
});
