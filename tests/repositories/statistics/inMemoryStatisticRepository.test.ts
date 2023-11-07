import { describe, expect, test } from "bun:test";
import { Statistic } from "../../../src/models/statistic";
import { Transaction } from "../../../src/models/transaction";
import { InMemoryStatisticRepository } from "../../../src/repositories/statistics/inMemory/inMemoryStatisticRepository";
import { InMemoryTransactionRepository } from "../../../src/repositories/transactions/inMemory/inMemoryTransactionRepository";

describe("In memory statistic repository", () => {
  test("Add statistics", async () => {
    const inMemoryStatisticRepository = new InMemoryStatisticRepository();
    const inMemoryTransactionRepository = new InMemoryTransactionRepository();

    const transaction1 = new Transaction({
      value: 15.99,
      dateHour: new Date(2022, 12, 1, 10, 0, 0),
    });

    const transaction2 = new Transaction({
      value: 28.44,
      dateHour: new Date(2022, 12, 1, 10, 0, 0),
    });

    await inMemoryTransactionRepository.create(transaction1);
    await inMemoryTransactionRepository.create(transaction2);

    const statistic = new Statistic();

    statistic.addTransaction(transaction1.value);
    statistic.addTransaction(transaction2.value);

    await inMemoryStatisticRepository.add(statistic);

    await inMemoryStatisticRepository.get();

    const storedStatistic = inMemoryStatisticRepository.statistics[0];

    expect(storedStatistic.getSummary().count).toBe(
      statistic.getSummary().count
    );
    expect(storedStatistic.getSummary().sum).toBe(statistic.getSummary().sum);
    expect(storedStatistic.getSummary().avg).toBe(statistic.getSummary().avg);
    expect(storedStatistic.getSummary().min).toBe(statistic.getSummary().min);
    expect(storedStatistic.getSummary().max).toBe(statistic.getSummary().max);
  });

  test("Get statistics", async () => {
    const inMemoryStatisticRepository = new InMemoryStatisticRepository();
    const inMemoryTransactionRepository = new InMemoryTransactionRepository();

    const transaction1 = new Transaction({
      value: 15.99,
      dateHour: new Date(2022, 12, 1, 10, 0, 0),
    });

    const transaction2 = new Transaction({
      value: 28.44,
      dateHour: new Date(2022, 12, 1, 10, 0, 0),
    });

    await inMemoryTransactionRepository.create(transaction1);
    await inMemoryTransactionRepository.create(transaction2);

    const statistic = new Statistic();

    statistic.addTransaction(transaction1.value);
    statistic.addTransaction(transaction2.value);

    await inMemoryStatisticRepository.add(statistic);

    await inMemoryStatisticRepository.get();

    const storedStatistic = inMemoryStatisticRepository.statistics[0];

    expect(storedStatistic.getSummary().count).toBe(
      statistic.getSummary().count
    );
    expect(storedStatistic.getSummary().sum).toBe(statistic.getSummary().sum);
    expect(storedStatistic.getSummary().avg).toBe(statistic.getSummary().avg);
    expect(storedStatistic.getSummary().min).toBe(statistic.getSummary().min);
    expect(storedStatistic.getSummary().max).toBe(statistic.getSummary().max);
  });
});
