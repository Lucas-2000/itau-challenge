import { Transaction } from "../../../models/transaction";
import { TransactionRepository } from "../transactionRepository";

export class InMemoryTransactionRepository implements TransactionRepository {
  public transactions: Transaction[] = [];

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  async delete(): Promise<void> {
    this.transactions.splice(0, this.transactions.length);
  }
}
