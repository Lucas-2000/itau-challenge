import { describe, expect, test } from "bun:test";
import { Statistic } from "./../../src/models/statistic";

describe("Statistic model", () => {
  test("Instance statistic", () => {
    const statistic = new Statistic({
      count: 10,
      sum: 10,
      avg: 10,
      max: 10,
      min: 10,
    });

    expect(statistic).toBeInstanceOf(Statistic);
  });
});
