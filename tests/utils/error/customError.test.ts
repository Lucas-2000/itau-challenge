import { describe, expect, test } from "bun:test";
import { Transaction } from "../../../src/models/transaction";
import { CustomError } from "../../../src/utils/error/customError";

describe("Custom error", () => {
  test("Throw custom error for invalid transaction", () => {
    try {
      new Transaction({
        value: 15,
        dateHour: new Date(),
      });
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error instanceof CustomError).toBe(true);
        expect(error.message).toBe("Value must be a decimal");
        expect(error.name).toBe("INVALID_VALUE");
      }
    }
  });
});
