import "./opciones.css";
import { useEffect, useState } from "react";
import { getCalculosOpciones } from "../../utils/getCalculosOpciones.ts";
import { Chart } from "../../components/Chart/Chart.tsx";
import { ListBasesTabla } from "../../components/Bases/ListBasesTabla.tsx";
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
    setData({
      ...ini_state,
      200: { call: [], put: [] },
      210: { call: [], put: [] },
      220: { call: [], put: [] },
      230: { call: [], put: [] },
      270: { call: [], put: [] },
      280: { call: [], put: [] },
    });
  }, []);

  const results = Object.keys(data).length > 0 ? getCalculosOpciones(data) : [];
  return (
    <>
      <main>
        <h1>Opciones</h1>
        <section>
          <aside>
            <ListBasesTabla OperationsList={data} />
          </aside>
          <aside>
            <Chart optionData={results} />
          </aside>
        </section>
      </main>
    </>
  );
};
