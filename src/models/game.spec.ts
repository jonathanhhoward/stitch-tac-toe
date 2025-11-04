import { describe, expect, it } from "vitest";
import { lilo, stitch, tie } from "../constants/players";
import { Game } from "./game";

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

describe("status", () => {
  it.each([
    [lilo, stitch, "Stitch wins!"],
    [stitch, lilo, "Lilo wins!"],
    [lilo, tie, "Tie!"],
    [stitch, null, "Stitch's turn"],
  ])("should return the correct status", (player, winner, status) => {
    const game = new Game();

    const result = game.status(player, winner);

    expect(result).toEqual(status);
  });
});
