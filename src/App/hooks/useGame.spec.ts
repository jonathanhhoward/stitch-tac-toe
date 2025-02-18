import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { initialState } from "../constants/initialState";
import { lilo, stitch } from "../constants/players";
import { Board } from "../models/board";
import { State } from "../types";
import { useGame } from "./useGame.ts";

describe("state", () => {
  it("should start with the state passed in", () => {
    const { result } = renderHook(() => useGame(initialState));

    expect(result.current.state).toEqual(initialState());
  });
});

describe("executeTurn", () => {
  it("should alternate players", () => {
    const { result } = renderHook(() => useGame(initialState));

    act(() => result.current.executeTurn([0, 0]));

    expect(result.current.state.status).toEqual("Lilo's turn");
  });

  it("should determine when there is a winner", () => {
    const { result } = renderHook(() =>
      useGame(() => ({
        board: new Board([
          [stitch, stitch, null],
          [null, null, null],
          [null, null, null],
        ]),
        status: "Stitch's turn",
        player: stitch,
        winner: null,
      })),
    );

    act(() => result.current.executeTurn([0, 2]));

    expect(result.current.state.status).toEqual("Stitch wins!");
  });

  it("should determine when there is a tie", () => {
    const { result } = renderHook(() =>
      useGame(() => ({
        board: new Board([
          [lilo, stitch, stitch],
          [stitch, stitch, lilo],
          [lilo, lilo, null],
        ]),
        status: "Stitch's turn",
        player: stitch,
        winner: null,
      })),
    );

    act(() => result.current.executeTurn([2, 2]));

    expect(result.current.state.status).toEqual("Tie!");
  });

  it("should not update state when a position is occupied", () => {
    const init = (): State => ({
      board: new Board([
        [stitch, null, null],
        [null, null, null],
        [null, null, null],
      ]),
      status: "Stitch's turn",
      player: stitch,
      winner: null,
    });
    const { result } = renderHook(() => useGame(init));

    act(() => result.current.executeTurn([0, 0]));

    expect(result.current.state).toEqual(init());
  });

  it("should not update state when there is a winner", () => {
    const init = (): State => ({
      board: new Board([
        [stitch, stitch, stitch],
        [null, null, null],
        [null, null, null],
      ]),
      status: "Stitch wins!",
      player: stitch,
      winner: stitch,
    });
    const { result } = renderHook(() => useGame(init));

    act(() => result.current.executeTurn([1, 0]));

    expect(result.current.state).toEqual(init());
  });
});

describe("startOver", () => {
  it("should set state to initialState", () => {
    const { result } = renderHook(() => useGame(initialState));

    act(() => {
      result.current.executeTurn([0, 0]);
      result.current.startOver();
    });

    expect(result.current.state).toEqual(initialState());
  });
});
