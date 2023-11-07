import { UseCase } from "../../../utils/interfaces/useCase";
import { CustomError } from "../../../utils/error/customError";
import { Transaction } from "../../../models/transaction";
import { TransactionRepository } from "../../../repositories/transactions/transactionRepository";

interface Data {
  value: number;
  dateHour?: Date;
}

export class CreateTransactionUseCase implements UseCase<Data, void> {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute({ value, dateHour }: Data): Promise<void> {
    try {
      const transaction = new Transaction({
        value,
        dateHour: dateHour ?? new Date(),
      });

      await this.transactionRepository.create(transaction);
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, error.name);
      } else {
        throw new CustomError(
          "Error on creating transaction",
          "ERROR_CODE_NOT_FOUND"
        );
      }
    }
  }
}
