import "./ListaTablaBases.css";
import { OptionOperations } from "../../../types";
import { BasesTabla } from "../../components/tablaBases/BasesTabla";

type Props = {
  OperationsList: OptionOperations;
  handleOnChangePrCant: (
    e: React.ChangeEvent<HTMLInputElement>,
    base: number,
    tipo: "call" | "put"
  ) => void;
  handleOnClickAddOper: (base: number, type: "call" | "put") => void;
  handleOnClickDeleteOper: (
    base: number,
    tipo: "call" | "put",
    id: string
  ) => void;
};

export const ListaTablaBases = ({
  OperationsList,
  handleOnChangePrCant,
  handleOnClickAddOper,
  handleOnClickDeleteOper,
}: Props) => {
  3;
  let bases = Object.keys(OperationsList);

  return (
    <div className="tablas-opciones">
      <h2>Tabla de operaciones</h2>
      <article className="tablas-bases">
        {bases.map((base) => {
          let operaciones = OperationsList[+base];
          let { call, put } = operaciones;
          return (
            <BasesTabla
              key={base}
              base={+base}
              callList={call}
              putList={put}
              handleOnChangePrCant={handleOnChangePrCant}
              handleOnClickAddOper={handleOnClickAddOper}
              handleOnClickDeleteOper={handleOnClickDeleteOper}
            />
          );
        })}
      </article>
    </div>
  );
};
