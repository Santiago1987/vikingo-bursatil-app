import { OptionsOperations, valueXEspecie, AccumulatedValues } from "../types";

type Props = {
  operationsList: OptionsOperations[];
};

export const calculoTotalValores = ({
  operationsList,
}: Props): valueXEspecie => {
  let accumulatedVals = accumulateValuesBases(operationsList);

  let result = coordinatesCalculation(accumulatedVals);

  return result;
};

function accumulateValuesBases(
  operationsList: OptionsOperations[]
): AccumulatedValues {
  const totalsBaseAccumulator: AccumulatedValues = {};
  operationsList.forEach((operations) => {
    const base = Object.keys(operations)[0];
    const callPrimaTotal: number = operations[+base].call.reduce(
      (acc, option) => acc + option.price * option.quantity,
      0
    );
    const putPrimaTotal = operations[+base].put.reduce(
      (acc, option) => acc + option.price * option.quantity,
      0
    );
    const callQuantityTotal = operations[+base].call.reduce(
      (acc, option) => acc + option.quantity,
      0
    );
    const putQuantityTotal = operations[+base].put.reduce(
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
  });
  return totalsBaseAccumulator;
}

function coordinatesCalculation(
  valueXEspecie: AccumulatedValues
): valueXEspecie {
  const coordinates: valueXEspecie = {};

  let especieList = Object.keys(valueXEspecie);

  for (let base of especieList) {
  }

  return coordinates;
}
