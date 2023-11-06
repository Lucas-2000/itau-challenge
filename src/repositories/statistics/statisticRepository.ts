import { Statistic } from "../../models/statistic";

export interface StatisticRepository {
  create(statistic: Statistic): Promise<void>;
  get(): Promise<Statistic[]>;
}
