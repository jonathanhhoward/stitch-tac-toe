import { act, renderHook } from "@testing-library/react";
import { initialState } from "../constants/initialState";
import { liloToken, stitchToken, tieToken } from "../constants/tokens";
import Board from "../models/board";
import { Player } from "../models/player";
import { Grid, State } from "../types";
import useStitchTacToe from "./useStitchTacToe";

class BoardFixture extends Board {
  public constructor(grid: Grid) {
    super(grid);
  }
}

const lilo = new Player(liloToken);
const stitch = new Player(stitchToken);
const tie = new Player(tieToken);

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
        [stitchToken, null, null],
        [null, null, null],
        [null, null, null],
      ]),
      gameStatus: "Lilo's turn",
      player: lilo,
      token: liloToken,
      winner: null,
    };
    const { result } = renderHook(() => useStitchTacToe(initialState));

    act(() => result.current.executeTurn([0, 0]));

    expect(result.current.state).toEqual(expected);
  });

  it("should determine when there is a winner", () => {
    const init = (): State => ({
      board: new BoardFixture([
        [stitchToken, stitchToken, null],
        [null, null, null],
        [null, null, null],
      ]),
      gameStatus: "Stitch's turn",
      player: stitch,
      token: stitchToken,
      winner: null,
    });
    const expected: State = {
      board: new BoardFixture([
        [stitchToken, stitchToken, stitchToken],
        [null, null, null],
        [null, null, null],
      ]),
      gameStatus: "Stitch wins!",
      player: lilo,
      token: liloToken,
      winner: stitch,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.executeTurn([0, 2]));

    expect(result.current.state).toEqual(expected);
  });

  it("should determine when there is a tie", () => {
    const init = (): State => ({
      board: new BoardFixture([
        [liloToken, stitchToken, stitchToken],
        [stitchToken, stitchToken, liloToken],
        [liloToken, liloToken, null],
      ]),
      gameStatus: "Stitch's turn",
      player: stitch,
      token: stitchToken,
      winner: null,
    });
    const expected: State = {
      board: new BoardFixture([
        [liloToken, stitchToken, stitchToken],
        [stitchToken, stitchToken, liloToken],
        [liloToken, liloToken, stitchToken],
      ]),
      gameStatus: "Tie!",
      player: lilo,
      token: liloToken,
      winner: tie,
    };
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.executeTurn([2, 2]));

    expect(result.current.state).toEqual(expected);
  });

  it("should not update state when a position is occupied", () => {
    const init = (): State => ({
      board: new BoardFixture([
        [stitchToken, null, null],
        [null, null, null],
        [null, null, null],
      ]),
      gameStatus: "Stitch's turn",
      player: stitch,
      token: stitchToken,
      winner: null,
    });
    const { result } = renderHook(() => useStitchTacToe(init));

    act(() => result.current.executeTurn([0, 0]));

    expect(result.current.state).toEqual(init());
  });

  it("should not update state when there is a winner", () => {
    const init = (): State => ({
      board: new BoardFixture([
        [stitchToken, stitchToken, stitchToken],
        [null, null, null],
        [null, null, null],
      ]),
      gameStatus: "Stitch wins!",
      player: stitch,
      token: stitchToken,
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
