import { Statistic } from "../../../models/statistic";
import { StatisticRepository } from "../statisticRepository";

export class InMemoryStatisticRepository implements StatisticRepository {
  public statistics: Statistic[] = [];

  async add(statistic: Statistic): Promise<void> {
    this.statistics.push(statistic);
  }

  async get(): Promise<Statistic[]> {
    return this.statistics;
  }
}
