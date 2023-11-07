import Elysia from "elysia";
import { CustomRes } from "../../../utils/res/customRes";
import { DeleteTransactionUseCase } from "../../../useCases/transactions/delete/deleteTransactionUseCase";

export class DeleteTransactionController {
  constructor(
    server: Elysia,
    private deleteTransactionUseCase: DeleteTransactionUseCase
  ) {
    server.delete("/transactions", async () => {
      await this.deleteTransactionUseCase.execute();

      return new CustomRes({
        body: "Transactions deleted successfully",
      }).ok();
    });
  }
}
