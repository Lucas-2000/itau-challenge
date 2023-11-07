import Elysia from "elysia";
import { InMemoryTransactionRepository } from "../repositories/transactions/inMemory/inMemoryTransactionRepository";
import { CreateTransactionUseCase } from "../useCases/transactions/create/createTransactionUseCase";
import { CreateTransactionController } from "../controllers/transactions/create/createTransactionController";
import { DeleteTransactionUseCase } from "../useCases/transactions/delete/deleteTransactionUseCase";
import { DeleteTransactionController } from "../controllers/transactions/delete/deleteTransactionController";

const transactionRoutes = new Elysia();

const inMemoryTransactionRepository = new InMemoryTransactionRepository();

const createTransactionUseCase = new CreateTransactionUseCase(
  inMemoryTransactionRepository
);
new CreateTransactionController(transactionRoutes, createTransactionUseCase);

const deleteTransactionUseCase = new DeleteTransactionUseCase(
  inMemoryTransactionRepository
);
new DeleteTransactionController(transactionRoutes, deleteTransactionUseCase);

export { transactionRoutes };
