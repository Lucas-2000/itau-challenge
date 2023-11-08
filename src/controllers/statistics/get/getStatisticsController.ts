import { CustomRes } from "../../../utils/res/customRes";
import { GetStatisticsUseCase } from "./../../../useCases/statistics/get/getStatisticsUseCase";
import Elysia from "elysia";

interface BodyController {
  time: number;
}

export class GetStatisticsController {
  constructor(
    server: Elysia,
    private getStatisticsUseCase: GetStatisticsUseCase
  ) {
    server.post("/statistics", async ({ body }) => {
      const { time } = body as BodyController;

      const statistics = await this.getStatisticsUseCase.execute({ time });

      return new CustomRes({
        body: statistics,
      }).ok();
    });
  }
}
