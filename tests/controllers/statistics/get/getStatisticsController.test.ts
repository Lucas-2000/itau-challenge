import request from "supertest";
import { describe, expect, test } from "bun:test";
import { server } from "../../../../src/config/server";

describe("Get statistics Controller", () => {
  test("Return 200 returned successfully all statistics equal to 0 if don't have any transactions on last 60 seconds", async () => {
    const response = await request(server)
      .post("/statistics")
      .send({ time: 60 });

    expect(response.body).toEqual({
      statusCode: 200,
      body: {
        count: 0,
        sum: 0,
        avg: 0,
        min: Number.MAX_SAFE_INTEGER,
        max: 0,
      },
      error: null,
    });
  });
});
