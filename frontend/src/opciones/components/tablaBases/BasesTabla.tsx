import "./BasesTabla.css";
import { OpcionesPrimaCant } from "../../../types";
import { Rows } from "./Rows";

type Props = {
  base: number;
  callList: OpcionesPrimaCant[];
  putList: OpcionesPrimaCant[];
};

export const BasesTabla = ({ base, callList, putList }: Props) => {
  return (
    <>
      <div className="option-table">
        <h3 id="base">{base}</h3>
        <div className="table-callput">
          <div className="table-call">
            <h4 className="call-put">Call</h4>
            <table>
              <thead>
                <th className="td-tableOpction-title">Cantidad</th>
                <th className="td-tableOpction-title">Prima</th>
                <th className="td-tableOpction-title">Total</th>
              </thead>
              <tbody>
                <Rows operaciones={callList} />
              </tbody>
            </table>
          </div>
          <div className="table-call">
            <h4 className="call-put">Put</h4>
            <table>
              <thead>
                <th className="td-tableOpction-title ">Cantidad</th>
                <th className="td-tableOpction-title ">Prima</th>
                <th className="td-tableOpction-title ">Total</th>
              </thead>
              <tbody>
                <Rows operaciones={putList} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
