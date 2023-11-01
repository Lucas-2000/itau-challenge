import { describe, expect, test } from "bun:test";
import { Transaction } from "../../src/models/transaction";

describe("Transaction model", () => {
  test("Instance transaction", () => {
    const transaction = new Transaction({
      value: 15.99,
      dateHour: new Date(2022, 12, 1, 10, 0, 0),
    });

    expect(transaction).toBeInstanceOf(Transaction);
  });

  test("Not Instance transaction if value is not decimal", () => {
    const createTransaction = () => {
      new Transaction({
        value: 15,
        dateHour: new Date(2023, 11, 1, 18, 19, 20),
      });
    };

    expect(createTransaction).toThrow(Error);
  });

  test("Not instance transaction if date is higher then the current date", () => {
    const createTransaction = () => {
      new Transaction({
        value: 15.99,
        dateHour: new Date(2023, 11, 1, 18, 19, 20),
      });
    };

    expect(createTransaction).toThrow(Error);
  });
});
