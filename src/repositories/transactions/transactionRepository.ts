import { Transaction } from "../../models/transaction";

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
  delete(): Promise<void>;
}
