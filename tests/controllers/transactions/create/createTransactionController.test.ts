import request from "supertest";
import { describe, expect, test } from "bun:test";
import { server } from "../../../../src/config/server";

describe("Create Transaction Controller", () => {
  test("Return 201 created successfully on valid input", async () => {
    const response = await request(server).post("/transactions").send({
      value: 15.99,
      dateHour: new Date(),
    });

    expect(response.body).toEqual({
      statusCode: 201,
      body: "Transaction created successfully",
      error: null,
    });
  });

  test("Return 400 Bad Request on invalid input", async () => {
    const response = await request(server).post("/transactions").send({
      dateHour: new Date(),
    });

    expect(response.body).toEqual({
      statusCode: 400,
      body: "Error on creating transaction",
      error: "Error",
    });
  });

  test("Return 422 Unprocessable Entity on negative value", async () => {
    const response = await request(server).post("/transactions").send({
      value: -15.99,
      dateHour: new Date(),
    });

    expect(response.body).toEqual({
      statusCode: 422,
      body: "Value must be positive",
      error: "INVALID_VALUE",
    });
  });

  test("Return 422 Unprocessable Entity on not decimal value", async () => {
    const response = await request(server).post("/transactions").send({
      value: 15,
      dateHour: new Date(),
    });

    expect(response.body).toEqual({
      statusCode: 422,
      body: "Value must be a decimal",
      error: "INVALID_VALUE",
    });
  });
});
