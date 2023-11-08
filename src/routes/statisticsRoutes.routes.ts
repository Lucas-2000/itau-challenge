import Elysia from "elysia";
import { GetStatisticsController } from "../controllers/statistics/get/getStatisticsController";
import { InMemoryStatisticRepository } from "../repositories/statistics/inMemory/inMemoryStatisticRepository";
import { GetStatisticsUseCase } from "../useCases/statistics/get/getStatisticsUseCase";
import { inMemoryTransactionRepository } from "./transactionsRoutes.routes";

const statisticsRoutes = new Elysia();

const inMemoryStatisticRepository = new InMemoryStatisticRepository();

const getStatisticsUseCase = new GetStatisticsUseCase(
  inMemoryStatisticRepository,
  inMemoryTransactionRepository
);
new GetStatisticsController(statisticsRoutes, getStatisticsUseCase);

export { statisticsRoutes };
