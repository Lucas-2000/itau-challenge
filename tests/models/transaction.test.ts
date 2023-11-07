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

  test("Not instance transaction if value is negative", () => {
    const createTransaction = () => {
      new Transaction({
        value: -15.99,
        dateHour: new Date(),
      });
    };

    expect(createTransaction).toThrow(Error);
  });

  test("Return true if is a decimal value", () => {
    const transaction = new Transaction({
      value: 15.99,
      dateHour: new Date(),
    });

    const res = transaction.isDecimalNumber(transaction.value);

    expect(res).toBe(true);
  });

  test("Return last 60 seconds transactions", () => {
    test("Return last 60 seconds transactions", () => {
      const now = new Date();
      const transactionNow = new Transaction({
        value: 15.99,
        dateHour: now,
      });

      const longAgo = new Date(now.getTime() - 61 * 1000);
      const transactionLongAgo = new Transaction({
        value: 10.0,
        dateHour: longAgo,
      });

      const lessThan60SecondsAgo = new Date(now.getTime() - 30 * 1000);
      const transactionLessThan60SecondsAgo = new Transaction({
        value: 20.0,
        dateHour: lessThan60SecondsAgo,
      });

      const transactions = [
        transactionNow,
        transactionLongAgo,
        transactionLessThan60SecondsAgo,
      ];

      const res = transactionNow.getLast60secondsTransactions(transactions);

      expect(res).toContain(transactionNow);
      expect(res).toContain(transactionLessThan60SecondsAgo);
      expect(res).not.toContain(transactionLongAgo);
    });
  });

  test("Get and set value", () => {
    const transaction = new Transaction({
      value: 15.99,
      dateHour: new Date(),
    });

    expect(transaction.value).toBe(15.99);

    transaction.value = 10.0;
    expect(transaction.value).toBe(10.0);
  });

  test("Get and set dateHour", () => {
    const initialDate = new Date(2022, 12, 1, 10, 0, 0);
    const updatedDate = new Date(2023, 1, 1, 12, 0, 0);
    const transaction = new Transaction({
      value: 15.99,
      dateHour: initialDate,
    });

    expect(transaction.dateHour).toEqual(initialDate);

    transaction.dateHour = updatedDate;
    expect(transaction.dateHour).toEqual(updatedDate);
  });
});
