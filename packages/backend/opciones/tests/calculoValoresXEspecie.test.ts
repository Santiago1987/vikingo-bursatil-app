import { accumulateValuesBases } from "../utils/calculoValoresXEspecie";
import { describe, expect, test } from "@jest/globals";

describe("accumulateValuesBases is a function", () => {
  test("accumulateValuesBases is a function", () => {
    expect(typeof accumulateValuesBases).toEqual("function");
  });
});
