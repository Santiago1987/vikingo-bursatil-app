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
      <table className="tabla-operaciones">
        <thead>
          <tr>
            <th colSpan={6} scope="colgroup" id="base">
              {base}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={3} scope="colgroup" className="call-put">
              Call
            </th>
            <th colSpan={3} scope="colgroup" className="call-put">
              Put
            </th>
          </tr>
          <tr>
            <td className="td-tableOpction-title">Cantidad</td>
            <td className="td-tableOpction-title">Prima</td>
            <td className="td-tableOpction-title">Total</td>
            <td className="td-tableOpction-title">Cantidad</td>
            <td className="td-tableOpction-title">Prima</td>
            <td className="td-tableOpction-title">Total</td>
          </tr>
          <Rows calls={callList} puts={putList} />
        </tbody>
      </table>
    </>
  );
};
