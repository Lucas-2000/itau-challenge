import Elysia from "elysia";
import { InMemoryTransactionRepository } from "../repositories/transactions/inMemory/inMemoryTransactionRepository";
import { CreateTransactionUseCase } from "../useCases/transactions/create/createTransactionUseCase";
import { CreateTransactionController } from "../controllers/transactions/create/createTransactionController";

const transactionRoutes = new Elysia();

const inMemoryTransactionRepository = new InMemoryTransactionRepository();
const createTransactionUseCase = new CreateTransactionUseCase(
  inMemoryTransactionRepository
);
new CreateTransactionController(transactionRoutes, createTransactionUseCase);

export { transactionRoutes };
