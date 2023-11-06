import { CreateTransactionUseCase } from "../../../../src/useCases/transactions/create/createTransactionUseCase";
import { InMemoryTransactionRepository } from "../../../../src/repositories/transactions/inMemory/inMemoryTransactionRepository";
import { describe, expect, test } from "bun:test";
import { Transaction } from "../../../../src/models/transaction";
import { CustomError } from "../../../../src/utils/error/customError";

describe("Create transaction use case", () => {
  let inMemoryTransactionRepository = new InMemoryTransactionRepository();
  let createTransactionUseCase = new CreateTransactionUseCase(
    inMemoryTransactionRepository
  );

  test("Create transaction", async () => {
    const validTransaction = new Transaction({
      value: 16.99,
      dateHour: new Date(2022, 12, 1, 10, 0, 0),
    });

    await createTransactionUseCase.execute(validTransaction);

    const createdTransaction =
      inMemoryTransactionRepository.transactions[0].getSummary();
    expect(createdTransaction).toEqual(validTransaction.getSummary());
  });

  test("Not create transaction if is invalid date", async () => {
    try {
      const invalidTransaction = new Transaction({
        value: 16.99,
        dateHour: new Date(2024, 12, 1, 10, 0, 0),
      });

      await createTransactionUseCase.execute(invalidTransaction);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toBe("Date Hour must be less than Date Time now");
        expect(error.name).toBe("INVALID_HOUR");
      }
    }
  });

  test("Not create transaction if value is not decimal", async () => {
    try {
      const invalidTransaction = new Transaction({
        value: 16,
        dateHour: new Date(2022, 12, 1, 10, 0, 0),
      });

      await createTransactionUseCase.execute(invalidTransaction);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toBe("Value must be a decimal");
        expect(error.name).toBe("INVALID_VALUE");
      }
    }
  });

  test("Not create transaction if value is negative", async () => {
    try {
      const invalidTransaction = new Transaction({
        value: -19.96,
        dateHour: new Date(2022, 12, 1, 10, 0, 0),
      });

      await createTransactionUseCase.execute(invalidTransaction);
    } catch (error) {
      if (error instanceof CustomError) {
        expect(error).toBeInstanceOf(CustomError);
        expect(error.message).toBe("Value must be positive");
        expect(error.name).toBe("INVALID_VALUE");
      }
    }
  });
});
