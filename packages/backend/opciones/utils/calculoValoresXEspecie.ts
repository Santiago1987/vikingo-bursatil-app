import { OptionsOperations, coordinates, AccumulatedValues } from "../types";

type Props = {
  operationsList: OptionsOperations;
};

export const calculoTotalValores = ({ operationsList }: Props): coordinates => {
  let accumulatedVals = accumulateValuesBases(operationsList);

  let result = coordinatesCalculation(accumulatedVals);

  return result;
};

export function accumulateValuesBases(
  operationsList: OptionsOperations
): AccumulatedValues {
  const totalsBaseAccumulator: AccumulatedValues = {
    callPrimaTotal: 0,
    putPrimaTotal: 0,
    totalPrima: 0,
    basesQty: {},
  };

  const bases = Object.keys(operationsList);

  for (let base of bases) {
    const basen = +base;
    const callPrimaTotal: number = operationsList[basen].call.reduce(
      (acc, option) => acc + option.price * option.quantity,
      0
    );
    const putPrimaTotal = operationsList[basen].put.reduce(
      (acc, option) => acc + option.price * option.quantity,
      0
    );
    const callQuantityTotal = operationsList[basen].call.reduce(
      (acc, option) => acc + option.quantity,
      0
    );
    const putQuantityTotal = operationsList[basen].put.reduce(
      (acc, option) => acc + option.quantity,
      0
    );

    const totalPrima = callPrimaTotal + putPrimaTotal;

    totalsBaseAccumulator.callPrimaTotal += callPrimaTotal * 100;
    totalsBaseAccumulator.putPrimaTotal += putPrimaTotal * 100;
    totalsBaseAccumulator.totalPrima += totalPrima * 100;

    totalsBaseAccumulator.basesQty[basen] = {
      callQuantityTotal,
      putQuantityTotal,
    };
  }
  return totalsBaseAccumulator;
}

export function coordinatesCalculation(
  valueXEspecie: AccumulatedValues
): coordinates {
  const coord: coordinates = {};
  let { callPrimaTotal, putPrimaTotal, totalPrima, basesQty } = valueXEspecie;

  let especieList = Object.keys(basesQty);

  for (let currbase of especieList) {
    let currbasen = +currbase;

    for (let base of especieList) {
      let basen = +base;
      if (coord[currbasen] === undefined) {
        coord[currbasen] = {
          call: 0,
          put: 0,
          total: 0,
        };
      }

      let basediff = Math.abs(currbasen - basen);

      // call
      let callqty =
        basen < currbasen ? valueXEspecie.basesQty[basen].callQuantityTotal : 0;
      coord[currbasen].call += callqty * basediff * 100;

      coord[currbasen].total += callqty * basediff * 100;

      // put
      let putqty =
        basen > currbasen ? valueXEspecie.basesQty[basen].putQuantityTotal : 0;
      coord[currbasen].put += putqty * basediff * 100;

      coord[currbasen].total += putqty * basediff * 100;
    }
    coord[currbasen].call += valueXEspecie.callPrimaTotal;
    coord[currbasen].put += valueXEspecie.putPrimaTotal;
    coord[currbasen].total += valueXEspecie.totalPrima;
  }
  return coord;
}
