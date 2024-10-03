import "./opciones.css";
import { useEffect, useState } from "react";
import { getCalculosOpciones } from "../../utils/getCalculosOpciones.ts";
import { Chart } from "../../components/Chart/Chart.tsx";
import { ListaTablaBases } from "../tablaBases/ListaTablaBases.tsx";
import { OptionOperations, OpcionesPrimaCant } from "../../../types.ts";
import { v4 as uuid } from "uuid";

type primacant = Omit<OpcionesPrimaCant, "id">;

type OpcionesResult = {
  [key: number]: {
    call: primacant[];
    put: primacant[];
  };
};

const ini_state = {
  240: {
    call: [{ cantidad: 40, prima: 30 }],
    put: [],
  },
  250: {
    call: [
      { cantidad: -40, prima: 27.31 },
      { cantidad: 50, prima: 25.8 },
    ],
    put: [],
  },
  260: { call: [{ cantidad: -50, prima: 23 }], put: [] },
};

export const Opciones = () => {
  const [data, setData] = useState<OptionOperations>({});

  useEffect(() => {
    let newData: OptionOperations = {};

    let result: OpcionesResult = {
      ...ini_state,
      200: { call: [], put: [] },
      210: { call: [], put: [] },
      220: { call: [], put: [] },
      230: { call: [], put: [] },
      270: { call: [], put: [] },
      280: { call: [], put: [] },
    };

    let index = Object.keys(result);
    for (let el of index) {
      let eln = +el;
      let { call, put } = result[eln];
      if (!newData[eln]) newData[eln] = { call: [], put: [] };

      if (call.length === 0)
        newData[eln].call.push({ id: uuid(), prima: 0, cantidad: 0 });

      if (put.length === 0)
        newData[eln].put.push({ id: uuid(), prima: 0, cantidad: 0 });

      if (call.length > 0) {
        for (let el of call) {
          newData[eln].call.push({ ...el, id: uuid() });
        }
      }

      if (put.length > 0) {
        for (let el of put) {
          newData[eln].put.push({ ...el, id: uuid() });
        }
      }

      result = { ...result, [eln]: { call, put } };
    }

    setData(newData);
  }, []);

  const handleOnChangePrCant = (
    ev: React.ChangeEvent<HTMLInputElement>,
    base: number,
    tipo: "call" | "put"
  ): void => {
    console.log("data", data);
    let { name, value, id } = ev.target;

    let datac = { ...data };

    let baseOper = { ...datac[base] };
    if (!baseOper) return;

    let operationidx = baseOper[tipo].findIndex((el) => el.id === id);
    if (operationidx < 0) return;

    let newOper = { ...baseOper[tipo][operationidx] };

    if (name === "cantidad") newOper.cantidad = +value;
    if (name === "prima") newOper.prima = +value;

    baseOper[tipo][operationidx] = newOper;

    datac[base] = { ...baseOper };

    setData(datac);
  };

  const results = Object.keys(data).length > 0 ? getCalculosOpciones(data) : [];

  return (
    <>
      <main>
        <h1>Opciones</h1>
        <section>
          <aside>
            <ListaTablaBases
              OperationsList={data}
              handleOnChangePrCant={handleOnChangePrCant}
            />
          </aside>
          <aside>
            <Chart optionData={results} />
          </aside>
        </section>
      </main>
    </>
  );
};
