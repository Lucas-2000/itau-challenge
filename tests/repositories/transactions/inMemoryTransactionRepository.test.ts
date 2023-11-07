import { describe, expect, test } from "bun:test";
import { Transaction } from "../../../src/models/transaction";
import { InMemoryTransactionRepository } from "../../../src/repositories/transactions/inMemory/inMemoryTransactionRepository";

describe("In memory transaction repository", () => {
  test("Create transaction", async () => {
    const inMemoryTransactionRepository = new InMemoryTransactionRepository();

    const transaction = new Transaction({
      value: 15.99,
      dateHour: new Date(2022, 12, 1, 10, 0, 0),
    });

    await inMemoryTransactionRepository.create(transaction);

    const storedTransaction = inMemoryTransactionRepository.transactions[0];

    expect(storedTransaction).toEqual(transaction);
  });

  test("Find All transactions", async () => {
    test("Find All transactions", async () => {
      const inMemoryTransactionRepository = new InMemoryTransactionRepository();

      const transaction1 = new Transaction({
        value: 15.99,
        dateHour: new Date(2022, 12, 1, 10, 0, 0),
      });

      const transaction2 = new Transaction({
        value: 10.99,
        dateHour: new Date(2022, 12, 2, 11, 0, 0),
      });

      await inMemoryTransactionRepository.create(transaction1);
      await inMemoryTransactionRepository.create(transaction2);

      const storedTransactions = await inMemoryTransactionRepository.findAll();

      expect(Array.isArray(storedTransactions)).toBe(true);

      expect(storedTransactions).toContain(transaction1);
      expect(storedTransactions).toContain(transaction2);
    });
  });

  test("Delete transactions", async () => {
    const inMemoryTransactionRepository = new InMemoryTransactionRepository();

    const transaction = new Transaction({
      value: 15.99,
      dateHour: new Date(2022, 12, 1, 10, 0, 0),
    });

    await inMemoryTransactionRepository.create(transaction);

    await inMemoryTransactionRepository.delete();

    expect(inMemoryTransactionRepository.transactions).toEqual([]);
  });
});
