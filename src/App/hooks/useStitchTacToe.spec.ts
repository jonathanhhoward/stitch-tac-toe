import { act, renderHook } from "@testing-library/react";
import { initialState } from "../constants/initialState";
import { emptyPlayer, liloPlayer, stitchPlayer } from "../constants/players";
import Board from "../models/board";
import { Player } from "../types";
import useStitchTacToe from "./useStitchTacToe";

class BoardFixture extends Board {
  public constructor(grid: Player[][]) {
    super(grid);
  }
}

describe("state", () => {
  it("should default to initialState", () => {
    const { result } = renderHook(() => useStitchTacToe());

    expect(result.current.state).toEqual(initialState);
  });
});

describe("placeToken", () => {
  it("should update state", () => {
    const init = {
      board: new BoardFixture([
        [stitchPlayer, stitchPlayer, emptyPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
      ]),
      player: stitchPlayer,
      winner: emptyPlayer,
    };
    const expected = {
      board: new BoardFixture([
        [stitchPlayer, stitchPlayer, stitchPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
      ]),
      player: liloPlayer,
      winner: stitchPlayer,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.placeToken([0, 2]));

    expect(result.current.state).toEqual(expected);
  });

  it("should not update state when a position is occupied", () => {
    const init = {
      board: new BoardFixture([
        [stitchPlayer, emptyPlayer, emptyPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
      ]),
      player: stitchPlayer,
      winner: emptyPlayer,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.placeToken([0, 0]));

    expect(result.current.state).toEqual(init);
  });

  it("should not update state when there is a winner", () => {
    const init = {
      board: new BoardFixture([
        [stitchPlayer, stitchPlayer, stitchPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
        [emptyPlayer, emptyPlayer, emptyPlayer],
      ]),
      player: stitchPlayer,
      winner: stitchPlayer,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.placeToken([1, 0]));

    expect(result.current.state).toEqual(init);
  });
});

describe("startOver", () => {
  it("should set state to initialState", () => {
    const { result } = renderHook(() => useStitchTacToe());

    act(() => {
      result.current.placeToken([0, 0]);
      result.current.startOver();
    });

    expect(result.current.state).toEqual(initialState);
  });
});
