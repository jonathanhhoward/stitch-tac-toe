import { act, renderHook } from "@testing-library/react";
import { initialState } from "../constants/initialState";
import {
  emptyToken,
  liloToken,
  stitchToken,
  tieToken,
} from "../constants/tokens";
import Board from "../models/board";
import { State, Token } from "../types";
import useStitchTacToe from "./useStitchTacToe";

class BoardFixture extends Board {
  public constructor(grid: Token[][]) {
    super(grid);
  }
}

describe("state", () => {
  it("should default to initialState", () => {
    const { result } = renderHook(() => useStitchTacToe(initialState));

    expect(result.current.state).toEqual(initialState);
  });
});

describe("placeToken", () => {
  it("should alternate players", () => {
    const expected: State = {
      board: new BoardFixture([
        [stitchToken, emptyToken, emptyToken],
        [emptyToken, emptyToken, emptyToken],
        [emptyToken, emptyToken, emptyToken],
      ]),
      gameStatus: "Lilo's turn",
      token: liloToken,
      winner: emptyToken,
    };
    const { result } = renderHook(() => useStitchTacToe(initialState));

    act(() => result.current.placeToken([0, 0]));

    expect(result.current.state).toEqual(expected);
  });

  it("should determine when there is a winner", () => {
    const init: State = {
      board: new BoardFixture([
        [stitchToken, stitchToken, emptyToken],
        [emptyToken, emptyToken, emptyToken],
        [emptyToken, emptyToken, emptyToken],
      ]),
      gameStatus: "Stitch's turn",
      token: stitchToken,
      winner: emptyToken,
    };
    const expected: State = {
      board: new BoardFixture([
        [stitchToken, stitchToken, stitchToken],
        [emptyToken, emptyToken, emptyToken],
        [emptyToken, emptyToken, emptyToken],
      ]),
      gameStatus: "Stitch wins!",
      token: liloToken,
      winner: stitchToken,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.placeToken([0, 2]));

    expect(result.current.state).toEqual(expected);
  });

  it("should determine when there is a tie", () => {
    const init: State = {
      board: new BoardFixture([
        [liloToken, stitchToken, stitchToken],
        [stitchToken, stitchToken, liloToken],
        [liloToken, liloToken, emptyToken],
      ]),
      gameStatus: "Stitch's turn",
      token: stitchToken,
      winner: emptyToken,
    };
    const expected: State = {
      board: new BoardFixture([
        [liloToken, stitchToken, stitchToken],
        [stitchToken, stitchToken, liloToken],
        [liloToken, liloToken, stitchToken],
      ]),
      gameStatus: "Tie!",
      token: liloToken,
      winner: tieToken,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.placeToken([2, 2]));

    expect(result.current.state).toEqual(expected);
  });

  it("should not update state when a position is occupied", () => {
    const init: State = {
      board: new BoardFixture([
        [stitchToken, emptyToken, emptyToken],
        [emptyToken, emptyToken, emptyToken],
        [emptyToken, emptyToken, emptyToken],
      ]),
      gameStatus: "Stitch's turn",
      token: stitchToken,
      winner: emptyToken,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.placeToken([0, 0]));

    expect(result.current.state).toEqual(init);
  });

  it("should not update state when there is a winner", () => {
    const init: State = {
      board: new BoardFixture([
        [stitchToken, stitchToken, stitchToken],
        [emptyToken, emptyToken, emptyToken],
        [emptyToken, emptyToken, emptyToken],
      ]),
      gameStatus: "Stitch wins!",
      token: stitchToken,
      winner: stitchToken,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.placeToken([1, 0]));

    expect(result.current.state).toEqual(init);
  });
});

describe("startOver", () => {
  it("should set state to initialState", () => {
    const { result } = renderHook(() => useStitchTacToe(initialState));

    act(() => {
      result.current.placeToken([0, 0]);
      result.current.startOver();
    });

    expect(result.current.state).toEqual(initialState);
  });
});
