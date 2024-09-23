import "./ListaTablaBases.css";
import { OptionOperations } from "../../../types";
import { BasesTabla } from "../../components/tablaBases/BasesTabla";

type Props = {
  OperationsList: OptionOperations;
};

export const ListaTablaBases = ({ OperationsList }: Props) => {
  let bases = Object.keys(OperationsList);

  return (
    <div className="tablas-opciones">
      <h2>Tabla de operaciones</h2>
      <article className="tablas-bases">
        {bases.map((base) => {
          let operaciones = OperationsList[+base];
          let { call, put } = operaciones;
          return (
            <BasesTabla key={base} base={+base} callList={call} putList={put} />
          );
        })}
      </article>
    </div>
  );
};
