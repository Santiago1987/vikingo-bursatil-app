import { OptionsOperations } from "../types";
import {
  accumulateValuesBases,
  coordinatesCalculation,
} from "../utils/calculoValoresXEspecie";
import { beforeAll, describe, expect, test } from "@jest/globals";

describe("accumulateValuesBases function", () => {
  test("it is a function?", () => {
    expect(typeof accumulateValuesBases).toEqual("function");
  });

  test("empty object returns an object", () => {
    expect(typeof accumulateValuesBases({})).toEqual("object");
  });

  test("checking acummulations of values", () => {
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

test("checking acummulations call sell", () => {
  let operationsList: OptionsOperations = {
    10: {
      call: [{ id: "1", price: 1, quantity: -5 }],
      put: [],
    },
    20: {
      call: [],
      put: [],
    },
  };

  expect(accumulateValuesBases(operationsList)).toEqual({
    callPrimaTotal: -500,
    putPrimaTotal: 0,
    totalPrima: -500,
    basesQty: {
      10: {
        callQuantityTotal: -5,
        putQuantityTotal: 0,
      },
      20: {
        callQuantityTotal: 0,
        putQuantityTotal: 0,
      },
    },
  });
});

test("checking acummulations call sell", () => {
  let operationsList: OptionsOperations = {
    10: {
      call: [{ id: "1", price: 1, quantity: -5 }],
      put: [{ id: "2", price: 2, quantity: -10 }],
    },
    20: {
      call: [],
      put: [],
    },
  };

  expect(accumulateValuesBases(operationsList)).toEqual({
    callPrimaTotal: -500,
    putPrimaTotal: -2000,
    totalPrima: -2500,
    basesQty: {
      10: {
        callQuantityTotal: -5,
        putQuantityTotal: -10,
      },
      20: {
        callQuantityTotal: 0,
        putQuantityTotal: 0,
      },
    },
  });
});

//------------------------------------------------------------
describe("coordinatesCalculation function", () => {
  test("it is a function?", () => {
    expect(typeof coordinatesCalculation).toEqual("function");
  });

  test("checking coordinates calculation: buy call base 10", () => {
    let valueXEspecie = {
      callPrimaTotal: -2000,
      putPrimaTotal: 0,
      totalPrima: -2000,
      basesQty: {
        10: {
          callQuantityTotal: 11,
          putQuantityTotal: 0,
        },
        20: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
      },
    };

    expect(coordinatesCalculation(valueXEspecie)).toEqual({
      10: {
        call: -2000,
        put: 0,
        total: -2000,
      },
      20: {
        call: 9000,
        put: 0,
        total: 9000,
      },
    });
  });

  test("checking coordinates calculation: buy call base 10, 3 bases", () => {
    let valueXEspecie = {
      callPrimaTotal: -2000,
      putPrimaTotal: 0,
      totalPrima: -2000,
      basesQty: {
        10: {
          callQuantityTotal: 11,
          putQuantityTotal: 0,
        },
        20: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
        30: { callQuantityTotal: 0, putQuantityTotal: 0 },
      },
    };

    expect(coordinatesCalculation(valueXEspecie)).toEqual({
      10: {
        call: -2000,
        put: 0,
        total: -2000,
      },
      20: {
        call: 9000,
        put: 0,
        total: 9000,
      },
      30: {
        call: 20000,
        put: 0,
        total: 20000,
      },
    });
  });

  test("checking coordinates calculation: buy put base 10", () => {
    let valueXEspecie = {
      callPrimaTotal: 0,
      putPrimaTotal: -1000,
      totalPrima: -1000,
      basesQty: {
        10: {
          callQuantityTotal: 0,
          putQuantityTotal: 5,
        },
        20: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
      },
    };

    expect(coordinatesCalculation(valueXEspecie)).toEqual({
      10: {
        call: 0,
        put: -1000,
        total: -1000,
      },
      20: {
        call: 0,
        put: -1000,
        total: -1000,
      },
    });
  });

  test("checking coordinates calculation: buy put base 20", () => {
    let valueXEspecie = {
      callPrimaTotal: 0,
      putPrimaTotal: -1000,
      totalPrima: -1000,
      basesQty: {
        10: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
        20: {
          callQuantityTotal: 0,
          putQuantityTotal: 5,
        },
      },
    };

    expect(coordinatesCalculation(valueXEspecie)).toEqual({
      10: {
        call: 0,
        put: 4000,
        total: 4000,
      },
      20: {
        call: 0,
        put: -1000,
        total: -1000,
      },
    });
  });

  test("checking coordinates calculation: buy put base 30", () => {
    let valueXEspecie = {
      callPrimaTotal: 0,
      putPrimaTotal: -1000,
      totalPrima: -1000,
      basesQty: {
        10: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
        20: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
        30: {
          callQuantityTotal: 0,
          putQuantityTotal: 5,
        },
      },
    };
    expect(coordinatesCalculation(valueXEspecie)).toEqual({
      10: {
        call: 0,
        put: 9000,
        total: 9000,
      },
      20: {
        call: 0,
        put: 4000,
        total: 4000,
      },
      30: { call: 0, put: -1000, total: -1000 },
    });
  });

  test("checking coordinates calculation: sell call base 10", () => {
    let valueXEspecie = {
      callPrimaTotal: 2000,
      putPrimaTotal: 0,
      totalPrima: 2000,
      basesQty: {
        10: {
          callQuantityTotal: -10,
          putQuantityTotal: 0,
        },
        20: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
        30: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
      },
    };
    expect(coordinatesCalculation(valueXEspecie)).toEqual({
      10: {
        call: 2000,
        put: 0,
        total: 2000,
      },
      20: {
        call: -8000,
        put: 0,
        total: -8000,
      },
      30: { call: -18000, put: 0, total: -18000 },
    });
  });

  test("checking coordinates calculation: sell put base 30", () => {
    let valueXEspecie = {
      callPrimaTotal: 0,
      putPrimaTotal: 2000,
      totalPrima: 2000,
      basesQty: {
        10: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
        20: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
        30: {
          callQuantityTotal: 0,
          putQuantityTotal: -20,
        },
      },
    };
    expect(coordinatesCalculation(valueXEspecie)).toEqual({
      10: {
        call: 0,
        put: -38000,
        total: -38000,
      },
      20: {
        call: 0,
        put: -18000,
        total: -18000,
      },
      30: { call: 0, put: 2000, total: 2000 },
    });
  });

  test("checking coordinates calculation: but call base 10, but put 20", () => {
    let valueXEspecie = {
      callPrimaTotal: -1000,
      putPrimaTotal: -2000,
      totalPrima: -3000,
      basesQty: {
        10: {
          callQuantityTotal: 5,
          putQuantityTotal: 0,
        },
        20: {
          callQuantityTotal: 0,
          putQuantityTotal: 10,
        },
        30: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
      },
    };
    expect(coordinatesCalculation(valueXEspecie)).toEqual({
      10: {
        call: -1000,
        put: 8000,
        total: 7000,
      },
      20: {
        call: 4000,
        put: -2000,
        total: 2000,
      },
      30: { call: 9000, put: -2000, total: 7000 },
    });
  });

  test("checking coordinates calculation: buy call base 10, sell put 30", () => {
    let valueXEspecie = {
      callPrimaTotal: -2000,
      putPrimaTotal: 5000,
      totalPrima: -3000,
      basesQty: {
        10: {
          callQuantityTotal: 10,
          putQuantityTotal: 0,
        },
        20: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
        30: {
          callQuantityTotal: 0,
          putQuantityTotal: -20,
        },
        40: {
          callQuantityTotal: 0,
          putQuantityTotal: 0,
        },
      },
    };
    expect(coordinatesCalculation(valueXEspecie)).toEqual({
      10: {
        call: -2000,
        put: -35000,
        total: -37000,
      },
      20: {
        call: 8000,
        put: -15000,
        total: -7000,
      },
      30: { call: 18000, put: 5000, total: 23000 },
      40: { call: 28000, put: 5000, total: 33000 },
    });
  });
});
