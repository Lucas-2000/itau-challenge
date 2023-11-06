import { TransactionRepository } from "../../../repositories/transactions/transactionRepository";
import { UseCase } from "./../../../utils/interfaces/useCase";

export class DeleteTransactionUseCase implements UseCase<void, void> {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(): Promise<void> {
    await this.transactionRepository.delete();
  }
}
