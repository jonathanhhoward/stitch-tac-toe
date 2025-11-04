import { describe, expect, it } from "vitest";
import { Coordinate } from "../types";

describe("Coordinate", () => {
  it("equals returns true for identical coordinates", () => {
    const a = new Coordinate(1, 2);
    const b = new Coordinate(1, 2);

    expect(a.equals(b)).toBe(true);
    expect(b.equals(a)).toBe(true);
  });

  it("equals returns false for different coordinates", () => {
    const a = new Coordinate(0, 0);
    const b = new Coordinate(0, 1);

    expect(a.equals(b)).toBe(false);
  });

  it("matches returns true when row and col match, false otherwise", () => {
    const c = new Coordinate(2, 1);

    expect(c.matches(2, 1)).toBe(true);
    expect(c.matches(1, 2)).toBe(false);
    expect(c.matches(2, 0)).toBe(false);
  });

  it("throws for non-integer coordinates", () => {
    expect(() => new Coordinate(0.5, 0)).toThrow();
    expect(() => new Coordinate(0, 1.2)).toThrow();
  });

  it("throws for out-of-bounds coordinates", () => {
    expect(() => new Coordinate(-1, 0)).toThrow();
    expect(() => new Coordinate(0, 3)).toThrow();
    expect(() => new Coordinate(3, 3)).toThrow();
  });
});
