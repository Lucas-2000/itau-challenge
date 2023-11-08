import { CustomRes } from "../../../utils/res/customRes";
import { GetStatisticsUseCase } from "./../../../useCases/statistics/get/getStatisticsUseCase";
import Elysia from "elysia";

export class GetStatisticsController {
  constructor(
    server: Elysia,
    private getStatisticsUseCase: GetStatisticsUseCase
  ) {
    server.get("/statistics", async () => {
      const statistics = await this.getStatisticsUseCase.execute();

      return new CustomRes({
        body: statistics,
      }).ok();
    });
  }
}
