import { OptionOperations, OptionCantAcum, OptionResult } from "../../types";

const ini_state = {
  10: {
    call_c: [
      { cantidad: 2, prima: 10 },
      { cantidad: 3, prima: 15 },
    ],
    put_c: [
      { cantidad: 2, prima: 7 },
      { cantidad: 3, prima: 11.5 },
    ],
  },
  20: {
    call_v: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
  },
};

export const getCalculosOpciones = () => {
  let data: OptionOperations = ini_state;
  data = { ...data, 0: {}, 30: {} };

  let bases = Object.keys(data);

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
    let { call_c, call_v, put_c, put_v } = data[base];

    callAcum[base] = 0;
    putAcum[base] = 0;

    // CALL comprados
    if (call_c && call_c.length > 0) {
      for (let operation of call_c) {
        let { cantidad, prima } = operation;

        primaCall -= cantidad * prima * 100;
        primaTotal -= cantidad * prima * 100;

        callAcum[base] += cantidad * 100;
      }
    }

    // CALL Vendidos
    if (call_v && call_v.length > 0) {
      for (let operation of call_v) {
        let { cantidad, prima } = operation;

        primaCall += cantidad * prima * 100;
        primaTotal += cantidad * prima * 100;

        callAcum[base] -= cantidad * 100;
      }
    }

    // PUT comprados
    if (put_c && put_c.length > 0) {
      for (let operation of put_c) {
        let { cantidad, prima } = operation;

        primaPut -= cantidad * prima * 100;
        primaTotal -= cantidad * prima * 100;

        putAcum[base] += cantidad * 100;
      }
    }

    // PUT vendidos
    if (put_v && put_v.length) {
      for (let operation of put_v) {
        let { cantidad, prima } = operation;

        primaPut += cantidad * prima * 100;
        primaTotal += cantidad * prima * 100;

        putAcum[base] - +cantidad * 100;
      }
    }
  }
  console.log(primaCall, primaPut, primaTotal);

  //Calculos de coordenadas
  //CALL
  for (let base of bases) {
    let x = +base;
    let list = bases.filter((el) => el <= base);
    let val = 0;
    for (let b of list) {
      let valBas = callAcum[+b] ? callAcum[+b] : 0;
      console.log(x, valBas);
      val += valBas * (x - +b);
    }

    result.push({
      base: x,
      callTotal: val + primaCall,
      total: val + primaTotal,
      putTotal: 0 + primaPut,
    });
  }

  //PUT
  bases.reverse();
  for (let base of bases) {
    let x = +base;
    let list = bases.filter((el) => el <= base);

    let val = 0;

    for (let b of list) {
      let k2 = +b;
      val = putAcum[k2] * (x - k2);
    }
    let id = result.findIndex((el) => el.base === x);
    result[id].total += val;
    result[id].putTotal += val;
  }

  return JSON.stringify(result);
};
