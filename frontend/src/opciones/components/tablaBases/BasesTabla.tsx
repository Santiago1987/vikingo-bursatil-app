import "./BasesTabla.css";
import { OpcionesPrimaCant } from "../../../types";
import { Rows } from "./Rows";
import { PlusIcon } from "../../../icons/PlusIcon";

type Props = {
  base: number;
  callList: OpcionesPrimaCant[];
  putList: OpcionesPrimaCant[];
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

export const BasesTabla = ({
  base,
  callList,
  putList,
  handleOnChangePrCant,
  handleOnClickAddOper,
  handleOnClickDeleteOper,
}: Props) => {
  return (
    <>
      <div className="option-table">
        <h3 id="base">{base}</h3>
        <div className="table-callput">
          <div className="table-call">
            <div className="call-put">
              <h4>Call</h4>
              <button
                className="plus-operation"
                onClick={() => handleOnClickAddOper(base, "call")}
              >
                <PlusIcon />
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="td-tableOpction-title">Cantidad</th>
                  <th className="td-tableOpction-title">Prima</th>
                  <th className="td-tableOpction-title">Total</th>
                </tr>
              </thead>
              <tbody>
                <Rows
                  base={base}
                  operaciones={callList}
                  handleOnChangePrCant={handleOnChangePrCant}
                  handleOnClickDeleteOper={handleOnClickDeleteOper}
                  tipo="call"
                />
              </tbody>
            </table>
          </div>
          <div className="table-call">
            <div className="call-put">
              <h4>Put</h4>
              <button
                className="plus-operation"
                onClick={() => handleOnClickAddOper(base, "call")}
              >
                <PlusIcon />
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="td-tableOpction-title ">Cantidad</th>
                  <th className="td-tableOpction-title ">Prima</th>
                  <th className="td-tableOpction-title ">Total</th>
                </tr>
              </thead>
              <tbody>
                <Rows
                  base={base}
                  operaciones={putList}
                  handleOnChangePrCant={handleOnChangePrCant}
                  handleOnClickDeleteOper={handleOnClickDeleteOper}
                  tipo="put"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
