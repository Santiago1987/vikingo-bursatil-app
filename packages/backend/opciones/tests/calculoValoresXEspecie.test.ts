import { OptionsOperations } from "../types";
import { accumulateValuesBases } from "../utils/calculoValoresXEspecie";
import { beforeAll, describe, expect, test } from "@jest/globals";

describe("accumulateValuesBases is a function", () => {
  test("accumulateValuesBases is a function", () => {
    expect(typeof accumulateValuesBases).toEqual("function");
  });
});

describe("accumulateValuesBases returns an object", () => {
  test("accumulateValuesBases returns an object", () => {
    expect(typeof accumulateValuesBases({})).toEqual("object");
  });
});

describe("accumulateValuesBases returns correct values", () => {
  test("accumulateValuesBases returns correct values", () => {
    let operationsList: OptionsOperations = {
      1: {
        call: [
          { id: "1", price: 1, quantity: 1 },
          { id: "2", price: 2, quantity: 2 },
        ],
        put: [
          { id: "3", price: 1, quantity: 1 },
          { id: "4", price: 2, quantity: 2 },
        ],
      },
      2: {
        call: [
          { id: "5", price: 1, quantity: 1 },
          { id: "6", price: 2, quantity: 2 },
        ],
        put: [
          { id: "7", price: 1, quantity: 1 },
          { id: "8", price: 2, quantity: 2 },
        ],
      },
    };

    expect(accumulateValuesBases(operationsList)).toEqual({
      1: {
        callPrimaTotal: 5,
        putPrimaTotal: 5,
        totalPrima: 10,
        callQuantityTotal: 3,
        putQuantityTotal: 3,
        totalQuantity: 6,
      },
      2: {
        callPrimaTotal: 5,
        putPrimaTotal: 5,
        totalPrima: 10,
        callQuantityTotal: 3,
        putQuantityTotal: 3,
        totalQuantity: 6,
      },
    });
  });
});

describe("accumulateValuesBases return ", () => {
  test("accumulateValuesBases returns correct values", () => {
    let operationsList: OptionsOperations = {
      1: {
        call: [
          { id: "1", price: 1, quantity: 1 },
          { id: "2", price: 2, quantity: 2 },
        ],
        put: [
          { id: "3", price: 1, quantity: 1 },
          { id: "4", price: 2, quantity: 2 },
        ],
      },
      3: {
        call: [
          { id: "5", price: 1, quantity: 1 },
          { id: "6", price: 2, quantity: 2 },
        ],
        put: [
          { id: "7", price: 1, quantity: 1 },
          { id: "8", price: 2, quantity: 2 },
        ],
      },
    };

    expect(accumulateValuesBases(operationsList)).toEqual({
      1: {
        callPrimaTotal: 5,
        putPrimaTotal: 5,
        totalPrima: 10,
        callQuantityTotal: 3,
        putQuantityTotal: 3,
        totalQuantity: 6,
      },
      2: {
        callPrimaTotal: 5,
        putPrimaTotal: 5,
        totalPrima: 10,
        callQuantityTotal: 3,
        putQuantityTotal: 3,
        totalQuantity: 6,
      },
    });
  });
});
