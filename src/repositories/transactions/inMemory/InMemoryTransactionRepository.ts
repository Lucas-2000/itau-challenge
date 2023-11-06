import { Transaction } from "../../../models/transaction";
import { TransactionRepository } from "../transactionRepository";

export class InMemoryTransactionRepoistory implements TransactionRepository {
  public transaction: Transaction[] = [];

  async create(transaction: Transaction): Promise<void> {
    this.transaction.push(transaction);
  }

  async delete(): Promise<void> {
    this.transaction.splice(0, this.transaction.length);
  }
}
