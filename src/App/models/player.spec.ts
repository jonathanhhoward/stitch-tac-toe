import Board from "./board";
import { Player } from "./player";

describe("placeToken", () => {
  it("should place the player's token on the board", () => {
    const player = new Player({ name: "", image: "" });
    const board = Board.create();

    player.placeToken(board, [0, 0]);

    expect(board.grid).toEqual([
      [player.token, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });
});
