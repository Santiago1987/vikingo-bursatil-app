import { OptionOperations, OptionCantAcum, OptionResult } from "../../types";

export const getCalculosOpciones = (
  OperationsList: OptionOperations
): OptionResult[] => {
  let bases = Object.keys(OperationsList);

  if (bases.length === 0) return [];

  bases.sort((a, b) => a.localeCompare(b));
  let result: OptionResult[] = [];

  let primaCall = 0;
  let primaPut = 0;
  let primaTotal = 0;

  let callAcum: OptionCantAcum = {};
  let putAcum: OptionCantAcum = {};

  //Calculos de las primas
  for (let i = 0; i < bases.length; i++) {
    let base = +bases[i];
    let { call, put } = OperationsList[base];

    callAcum[base] = 0;
    putAcum[base] = 0;

    // CALL comprados
    if (call && call.length > 0) {
      for (let operation of call) {
        let { cantidad, prima } = operation;
        if (cantidad && prima) {
          primaCall -= cantidad * prima * 100;
          primaTotal -= cantidad * prima * 100;

          callAcum[base] += cantidad * 100;
        }
      }
    }

    // PUT comprados
    if (put && put.length > 0) {
      for (let operation of put) {
        let { cantidad, prima } = operation;
        if (cantidad && prima) {
          primaPut -= cantidad * prima * 100;
          primaTotal -= cantidad * prima * 100;

          putAcum[base] += cantidad * 100;
        }
      }
    }
  }

  //Calculos de coordenadas
  //CALL
  for (let base of bases) {
    let currentBase = +base;
    let val = 0;

    let id = 0;
    while (currentBase - +bases[id] > 0) {
      let b = +bases[id];
      let valBas = callAcum[+b] ? callAcum[+b] : 0;
      val += valBas * (currentBase - +b);

      id++;
    }

    result.push({
      base: currentBase,
      callTotal: val + primaCall,
      total: val + primaTotal,
      putTotal: 0 + primaPut,
    });
  }

  //PUT
  //bases.reverse();
  for (let i = bases.length - 1; i > -1; i--) {
    let currentBase = +bases[i];
    let val = 0;

    let idx = bases.length - 1;

    while (currentBase - +bases[idx] < 0) {
      let b = +bases[idx];
      let valBas = putAcum[+b] ? putAcum[+b] : 0;
      val += valBas * (currentBase - +b);

      idx--;
    }
    result[i].total -= val;
    result[i].putTotal -= val;
  }

  return result;
};
