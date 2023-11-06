import { Statistic } from "../../models/statistic";

export interface StatisticRepository {
  add(statistic: Statistic): Promise<void>;
  get(): Promise<Statistic[]>;
}
