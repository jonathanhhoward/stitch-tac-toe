import { act, renderHook } from "@testing-library/react";
import { initialState } from "../constants/initialState";
import { lilo, stitch, tie } from "../constants/players";
import Board from "../models/board";
import { Grid, State } from "../types";
import useStitchTacToe from "./useStitchTacToe";

class BoardFixture extends Board {
  public constructor(grid: Grid) {
    super(grid);
  }
}

describe("state", () => {
  it("should start with the state passed in", () => {
    const { result } = renderHook(() => useStitchTacToe(initialState));

    expect(result.current.state).toEqual(initialState());
  });
});

describe("executeTurn", () => {
  it("should alternate players", () => {
    const expected: State = {
      board: new BoardFixture([
        [stitch.token, null, null],
        [null, null, null],
        [null, null, null],
      ]),
      gameStatus: "Lilo's turn",
      player: lilo,
      winner: null,
    };
    const { result } = renderHook(() => useStitchTacToe(initialState));

    act(() => result.current.executeTurn([0, 0]));

    expect(result.current.state).toEqual(expected);
  });

  it("should determine when there is a winner", () => {
    const init = (): State => ({
      board: new BoardFixture([
        [stitch.token, stitch.token, null],
        [null, null, null],
        [null, null, null],
      ]),
      gameStatus: "Stitch's turn",
      player: stitch,
      winner: null,
    });
    const expected: State = {
      board: new BoardFixture([
        [stitch.token, stitch.token, stitch.token],
        [null, null, null],
        [null, null, null],
      ]),
      gameStatus: "Stitch wins!",
      player: lilo,
      winner: stitch,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.executeTurn([0, 2]));

    expect(result.current.state).toEqual(expected);
  });

  it("should determine when there is a tie", () => {
    const init = (): State => ({
      board: new BoardFixture([
        [lilo.token, stitch.token, stitch.token],
        [stitch.token, stitch.token, lilo.token],
        [lilo.token, lilo.token, null],
      ]),
      gameStatus: "Stitch's turn",
      player: stitch,
      winner: null,
    });
    const expected: State = {
      board: new BoardFixture([
        [lilo.token, stitch.token, stitch.token],
        [stitch.token, stitch.token, lilo.token],
        [lilo.token, lilo.token, stitch.token],
      ]),
      gameStatus: "Tie!",
      player: lilo,
      winner: tie,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.executeTurn([2, 2]));

    expect(result.current.state).toEqual(expected);
  });

  it("should not update state when a position is occupied", () => {
    const init = (): State => ({
      board: new BoardFixture([
        [stitch.token, null, null],
        [null, null, null],
        [null, null, null],
      ]),
      gameStatus: "Stitch's turn",
      player: stitch,
      winner: null,
    });
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.executeTurn([0, 0]));

    expect(result.current.state).toEqual(init());
  });

  it("should not update state when there is a winner", () => {
    const init = (): State => ({
      board: new BoardFixture([
        [stitch.token, stitch.token, stitch.token],
        [null, null, null],
        [null, null, null],
      ]),
      gameStatus: "Stitch wins!",
      player: stitch,
      winner: stitch,
    });
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.executeTurn([1, 0]));

    expect(result.current.state).toEqual(init());
  });
});

describe("startOver", () => {
  it("should set state to initialState", () => {
    const { result } = renderHook(() => useStitchTacToe(initialState));

    act(() => {
      result.current.executeTurn([0, 0]);
      result.current.startOver();
    });

    expect(result.current.state).toEqual(initialState());
  });
});
