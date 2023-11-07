import Elysia from "elysia";
import { CreateTransactionUseCase } from "../../../useCases/transactions/create/createTransactionUseCase";
import { TransactionProps } from "../../../models/transaction";
import { CustomRes } from "../../../utils/res/customRes";
import { CustomError } from "../../../utils/error/customError";

export class CreateTransactionController {
  constructor(
    server: Elysia,
    private createTransactionUseCase: CreateTransactionUseCase
  ) {
    server.post("/transactions", async ({ body }) => {
      const { value, dateHour } = body as TransactionProps;

      try {
        await this.createTransactionUseCase.execute({ value, dateHour });

        return new CustomRes({
          body: "Transaction created successfully",
        }).created();
      } catch (error) {
        if (error instanceof CustomError) {
          return new CustomRes({
            body: error.message,
            error: error.name,
          }).unprocessableEntity();
        } else if (error instanceof Error) {
          return new CustomRes({
            body: error.message,
            error: error.name,
          }).badRequest();
        }
      }
    });
  }
}
