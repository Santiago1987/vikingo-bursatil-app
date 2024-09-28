import "./opciones.css";
import { useEffect, useState } from "react";
import { getCalculosOpciones } from "../../utils/getCalculosOpciones.ts";
import { Chart } from "../../components/chart/Chart.tsx";
import { ListaTablaBases } from "../tablaBases/ListaTablaBases.tsx";
import { OptionOperations } from "../../../types.ts";

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
    let result: OptionOperations = {
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
      console.log(eln, result[eln]);
      let { call, put } = result[eln];

      if (call.length === 0) call.push({ prima: 0, cantidad: 0 });
      if (put.length === 0) put.push({ prima: 0, cantidad: 0 });

      result = { ...result, [eln]: { call, put } };
    }

    setData(result);
  }, []);

  const results = Object.keys(data).length > 0 ? getCalculosOpciones(data) : [];
  return (
    <>
      <main>
        <h1>Opciones</h1>
        <section>
          <aside>
            <ListaTablaBases OperationsList={data} />
          </aside>
          <aside>
            <Chart optionData={results} />
          </aside>
        </section>
      </main>
    </>
  );
};
