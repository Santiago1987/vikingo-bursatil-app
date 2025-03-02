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
  const totalsBaseAccumulator: AccumulatedValues = {};

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
    const totalQuantity = callQuantityTotal + putQuantityTotal;

    totalsBaseAccumulator[base] = {
      callPrimaTotal,
      putPrimaTotal,
      totalPrima,
      callQuantityTotal,
      putQuantityTotal,
      totalQuantity,
    };
  }
  return totalsBaseAccumulator;
}

export function coordinatesCalculation(
  valueXEspecie: AccumulatedValues
): coordinates {
  const coord: coordinates = {};

  let especieList = Object.keys(valueXEspecie);

  for (let currbase of especieList) {
    let currbasen = +currbase;

    for (let base of especieList) {
      let basen = +base;

      // call
      if (basen < currbasen) {
        if (valueXEspecie[base]) {
          coord[currbasen].call +=
            valueXEspecie[basen].callQuantityTotal * (currbasen - basen) -
            valueXEspecie[base].callPrimaTotal;

          coord[currbasen].total += coord[currbasen].call;
        }
      }

      // put
      if (basen > currbasen) {
        if (valueXEspecie[base]) {
          coord[currbasen].put +=
            valueXEspecie[basen].putQuantityTotal * (basen - currbasen) -
            valueXEspecie[base].putPrimaTotal;

          coord[currbasen].total -= coord[currbasen].put;
        }
      }
    }
  }
  return coord;
}
