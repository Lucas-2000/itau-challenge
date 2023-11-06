import { CreateTransactionUseCase } from "../../../../src/useCases/transactions/create/createTransactionUseCase";
import { InMemoryTransactionRepository } from "../../../../src/repositories/transactions/inMemory/inMemoryTransactionRepository";
import { describe, expect, test } from "bun:test";
import { Transaction } from "../../../../src/models/transaction";
import { DeleteTransactionUseCase } from "../../../../src/useCases/transactions/delete/deleteTransactionUseCase";

describe("Delete transaction use case", () => {
  let inMemoryTransactionRepository = new InMemoryTransactionRepository();
  let createTransactionUseCase = new CreateTransactionUseCase(
    inMemoryTransactionRepository
  );
  let deleteTransactionUseCase = new DeleteTransactionUseCase(
    inMemoryTransactionRepository
  );

  test("Delete all transactions", async () => {
    const validTransaction = new Transaction({
      value: 16.99,
      dateHour: new Date(2022, 12, 1, 10, 0, 0),
    });

    await createTransactionUseCase.execute(validTransaction);

    await deleteTransactionUseCase.execute();

    expect(inMemoryTransactionRepository.transactions).toEqual([]);
  });
});
