import { describe, expect, test } from "bun:test";
import { Statistic } from "./../../src/models/statistic";

describe("Statistic model", () => {
  test("Instance statistic", () => {
    const statistic = new Statistic();

    expect(statistic).toBeInstanceOf(Statistic);
  });

  test("Add transaction", () => {
    const statistic = new Statistic();

    statistic.addTransaction(10);

    const res = statistic.getSummary();

    expect(res).toEqual({
      count: 1,
      sum: 10,
      avg: 10,
      min: 10,
      max: 10,
    });
  });

  test("Reset transaction values", () => {
    const statistic = new Statistic();

    statistic.reset();

    const res = statistic.getSummary();

    expect(res).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: Number.MAX_SAFE_INTEGER,
      max: 0,
    });
  });
});
