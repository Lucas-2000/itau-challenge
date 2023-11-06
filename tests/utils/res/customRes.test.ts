import { describe, expect, test } from "bun:test";
import { CustomRes } from "../../../src/utils/res/customRes";

describe("Custom Res", () => {
  test("Instance custom Res", () => {
    const customRes = new CustomRes({});

    expect(customRes).toBeInstanceOf(CustomRes);
  });

  test("Created return status code 201", () => {
    const customRes = new CustomRes({});

    const res = customRes.created();

    expect(res.statusCode).toEqual(201);
  });

  test("Unprocessable Entity return status code 422", () => {
    const customRes = new CustomRes({});

    const res = customRes.unprocessableEntity();

    expect(res.statusCode).toEqual(422);
  });

  test("Bad Request return status code 400", () => {
    const customRes = new CustomRes({});

    const res = customRes.badRequest();

    expect(res.statusCode).toEqual(400);
  });
});
