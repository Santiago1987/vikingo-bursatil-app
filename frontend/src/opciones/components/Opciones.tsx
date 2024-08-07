import { Chart } from "react-chartjs-2";
import { getCalculosOpciones } from "../utils/getCalculosOpciones.ts";

export const Opciones = () => {
  const data = getCalculosOpciones();

  return (
    <>
      <h1>Resultado</h1>
    </>
  );
};
