import { OpcionesContrato, OptionOperations } from "../../types";

export const getCalculosOpciones = () => {
  let data: OptionOperations = ini_state;

  const bases = Object.keys(data);
  let result: any[] = [];

  let primaCall = 0;
  let primcaput = 0;
  let primaTotal = 0;

  let valorX = 0;
  let valorY = 0;

  //Calculos de las primas
  for (let i = 0; i < bases.length; i++) {
    let base = +bases[i];
    let { call_c, call_v, put_c, put_v } = data[base];

    // CALL comprados
    for (let operation of call_c) {
      let { cantidad, prima } = operation;

      primaCall -= cantidad * prima;
      primaTotal -= cantidad * prima;
    }

    // CALL Vendidos
    for (let operation of call_v) {
      let { cantidad, prima } = operation;

      primaCall += cantidad * prima;
      primaTotal += cantidad * prima;
    }

    // PUT comprados
    for (let operation of put_c) {
      let { cantidad, prima } = operation;

      primcaput -= cantidad * prima;
      primaTotal -= cantidad * prima;
    }

    // PUT vendidos
    for (let operation of put_v) {
      let { cantidad, prima } = operation;

      primcaput += cantidad * prima;
      primaTotal += cantidad * prima;
    }
  }

  return result;
};

const ini_state = {
  10: {
    call_c: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
    call_v: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
    put_c: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
    put_v: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
  },
  20: {
    call_c: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
    call_v: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
    put_c: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
    put_v: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
  },
  30: {
    call_c: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
    call_v: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
    put_c: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
    put_v: [
      { cantidad: 2, prima: 5 },
      { cantidad: 3, prima: 7 },
    ],
  },
};
