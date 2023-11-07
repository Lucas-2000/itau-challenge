import { Transaction } from "../../models/transaction";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
  findAll(): Promise<Transaction[]>;
  delete(): Promise<void>;
}
