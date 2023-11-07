import { describe, expect, test } from "bun:test";
import { InMemoryTransactionRepository } from "./../../../../src/repositories/transactions/inMemory/inMemoryTransactionRepository";
import { InMemoryStatisticRepository } from "../../../../src/repositories/statistics/inMemory/inMemoryStatisticRepository";
import { GetStatisticsUseCase } from "../../../../src/useCases/statistics/get/getStatisticsUseCase";
import { Transaction } from "../../../../src/models/transaction";
import { CreateTransactionUseCase } from "../../../../src/useCases/transactions/create/createTransactionUseCase";

describe("Get statistics use case", () => {
  test("Get the statistics for the last 60 seconds", async () => {
    const inMemoryStatisticRepository = new InMemoryStatisticRepository();
    const inMemoryTransactionRepository = new InMemoryTransactionRepository();

    const getStatisticsUseCase = new GetStatisticsUseCase(
      inMemoryStatisticRepository,
      inMemoryTransactionRepository
    );
    const createTransactionUseCase = new CreateTransactionUseCase(
      inMemoryTransactionRepository
    );

    const transaction1 = new Transaction({
      value: 15.99,
      dateHour: new Date(),
    });

    const transaction2 = new Transaction({
      value: 28.44,
      dateHour: new Date(),
    });

    await createTransactionUseCase.execute(transaction1);
    await createTransactionUseCase.execute(transaction2);

    const statistics = await getStatisticsUseCase.execute();

    expect(statistics[0]).toHaveProperty("count");
    expect(statistics[0]).toHaveProperty("sum");
    expect(statistics[0]).toHaveProperty("avg");
    expect(statistics[0]).toHaveProperty("min");
    expect(statistics[0]).toHaveProperty("max");

    expect(statistics[0].count).toBe(2);
    expect(statistics[0].sum).toBeCloseTo(44.43, 2);
  });
});
