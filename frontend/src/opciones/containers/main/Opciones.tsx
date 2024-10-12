import "./opciones.css";
import { useEffect } from "react";
import { getCalculosOpciones } from "../../utils/getCalculosOpciones.ts";
import { Chart } from "../../components/chart/Chart.tsx";
import { ListaTablaBases } from "../tablaBases/ListaTablaBases.tsx";
import { OptionOperations, OpcionesPrimaCant } from "../../../types.ts";
import { v4 as uuid } from "uuid";
import useOpciones from "../../hooks/useOpciones.ts";

type primacant = Omit<OpcionesPrimaCant, "id">;

type OpcionesResult = {
  [key: number]: {
    call: primacant[];
    put: primacant[];
  };
};

const ini_state = {
  240: {
    call: [{ cantidad: 40, prima: 10 }],
    put: [],
  },
  250: {
    call: [{ cantidad: -40, prima: 7 }],
    put: [],
  },
  260: { call: [], put: [] },
};

export const Opciones = () => {
  const {
    operaciones,
    changePrimaCant,
    addOperation,
    deleteOperation,
    setOperations,
  } = useOpciones();

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

    setOperations(newData);
  }, []);

  //INGRESO DE DATOS
  const handleOnChangePrCant = (
    ev: React.ChangeEvent<HTMLInputElement>,
    base: number,
    tipo: "call" | "put"
  ): void => {
    let { name, value, id } = ev.target;
    if (name !== "cantidad" && name !== "prima") return;

    changePrimaCant(base, tipo, name, +value, id);
  };

  //AGREGADO DE NUEVAS FILAS
  const handleOnClickAddOper = (base: number, type: "call" | "put") => {
    addOperation(base, type);
  };

  //DELETEO DE OPERACIONES
  const handleOnClickDeleteOper = (
    base: number,
    tipo: "call" | "put",
    id: string
  ) => {
    deleteOperation(base, tipo, id);
  };

  const results =
    Object.keys(operaciones).length > 0 ? getCalculosOpciones(operaciones) : [];

  return (
    <>
      <main>
        <h1>Opciones</h1>
        <section>
          <aside>
            {Object.keys(operaciones).length === 0 ? (
              <p>Loading...</p>
            ) : (
              <ListaTablaBases
                OperationsList={operaciones}
                handleOnChangePrCant={handleOnChangePrCant}
                handleOnClickAddOper={handleOnClickAddOper}
                handleOnClickDeleteOper={handleOnClickDeleteOper}
              />
            )}
          </aside>
          <aside>
            {Object.keys(operaciones).length === 0 ? (
              <p>Loading...</p>
            ) : (
              <Chart optionData={results} />
            )}
          </aside>
        </section>
      </main>
    </>
  );
};
