import request from "supertest";
import { describe, expect, test } from "bun:test";
import { server } from "../../../../src/config/server";

describe("Delete Transaction Controller", () => {
  test("Return 200 deleted successfully all transactions", async () => {
    const response = await request(server).delete("/transactions");

    expect(response.body).toEqual({
      statusCode: 200,
      body: "Transactions deleted successfully",
      error: null,
    });
  });
});
