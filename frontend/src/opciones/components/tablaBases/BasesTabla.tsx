import "./BasesTabla.css";
import { OpcionesPrimaCant } from "../../../types";
import { Rows } from "./Rows";

type Props = {
  base: number;
  callList: OpcionesPrimaCant[];
  putList: OpcionesPrimaCant[];
  handleOnChangePrCant: (
    e: React.ChangeEvent<HTMLInputElement>,
    base: number,
    tipo: "call" | "put"
  ) => void;
};

export const BasesTabla = ({
  base,
  callList,
  putList,
  handleOnChangePrCant,
}: Props) => {
  return (
    <>
      <div className="option-table">
        <h3 id="base">{base}</h3>
        <div className="table-callput">
          <div className="table-call">
            <h4 className="call-put">Call</h4>
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
                  tipo="call"
                />
              </tbody>
            </table>
          </div>
          <div className="table-call">
            <h4 className="call-put">Put</h4>
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
