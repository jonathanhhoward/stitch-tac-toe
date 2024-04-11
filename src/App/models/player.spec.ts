import { Coordinate } from "../types";
import Board from "./board";
import { Player } from "./player";

describe("placeToken", () => {
  it("should place the player's token on the board", () => {
    const player = new Player({ name: "", image: "" });
    const board = {
      add: jest.fn() as jest.Mocked<typeof Board.prototype.add>,
    } as Board;
    const position: Coordinate = [0, 0];

    player.placeToken(board, position);

    expect(board.add).toHaveBeenCalledWith(player.token, position);
  });
});
