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

describe("accumulateValuesBases returns correct values fullbases", () => {
  test("accumulateValuesBases returns correct values", () => {
    let operationsList: OptionsOperations = {
      1: {
        call: [
          { id: "1", price: 1, quantity: 5 },
          { id: "2", price: 2, quantity: 6 },
        ],
        put: [
          { id: "3", price: 1, quantity: 10 },
          { id: "4", price: 2, quantity: 15 },
        ],
      },
      2: {
        call: [
          { id: "5", price: 1, quantity: 20 },
          { id: "6", price: 2, quantity: 10 },
        ],
        put: [
          { id: "7", price: 1, quantity: 30 },
          { id: "8", price: 2, quantity: 40 },
        ],
      },
    };

    expect(accumulateValuesBases(operationsList)).toEqual({
      callPrimaTotal: 5700,
      putPrimaTotal: 15000,
      totalPrima: 20700,
      basesQty: {
        1: {
          callQuantityTotal: 11,
          putQuantityTotal: 25,
        },
        2: {
          callQuantityTotal: 30,
          putQuantityTotal: 70,
        },
      },
    });
  });
});

describe("accumulateValuesBases returns correct values empty bases", () => {
  test("base 1 has no operations", () => {
    let operationsList: OptionsOperations = {
      1: {
        call: [],
        put: [],
      },
      2: {
        call: [
          { id: "1", price: 1, quantity: 5 },
          { id: "2", price: 2, quantity: 6 },
        ],
        put: [
          { id: "3", price: 1, quantity: 10 },
          { id: "4", price: 2, quantity: 15 },
        ],
      },
      3: {
        call: [
          { id: "5", price: 1, quantity: 20 },
          { id: "6", price: 2, quantity: 10 },
        ],
        put: [
          { id: "7", price: 1, quantity: 30 },
          { id: "8", price: 2, quantity: 40 },
        ],
      },
    };

    expect(accumulateValuesBases(operationsList)).toEqual({
      callPrimaTotal: 5700,
      putPrimaTotal: 15000,
      totalPrima: 20700,
      basesQty: {
        1: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
        2: {
          callQuantityTotal: 11,
          putQuantityTotal: 25,
        },
        3: {
          callQuantityTotal: 30,
          putQuantityTotal: 70,
        },
      },
    });
  });
});
