import { Statistic, StatisticProps } from "../../../models/statistic";
import { Transaction } from "../../../models/transaction";
import { StatisticRepository } from "../../../repositories/statistics/statisticRepository";
import { TransactionRepository } from "../../../repositories/transactions/transactionRepository";
import { UseCase } from "../../../utils/interfaces/useCase";

export class GetStatisticsUseCase implements UseCase<void, StatisticProps[]> {
  constructor(
    private statisticRepository: StatisticRepository,
    private transactionRepository: TransactionRepository
  ) {}

  async execute(): Promise<StatisticProps[]> {
    const statistic = new Statistic();

    statistic.reset();

    const transactions = await this.transactionRepository.findAll();

    const processedTransactions = new Set<Transaction>();

    transactions.forEach((transaction) => {
      const last60sTransactions =
        transaction.getLast60secondsTransactions(transactions);

      last60sTransactions.forEach((t) => {
        if (!processedTransactions.has(t)) {
          statistic.addTransaction(t.value);
          processedTransactions.add(t);
        }
      });
    });

    await this.statisticRepository.add(statistic);

    const statistics = await this.statisticRepository.get();

    const statisticsSummary: StatisticProps[] = statistics.map((statistic) =>
      statistic.getSummary()
    );

    return statisticsSummary;
  }
}
