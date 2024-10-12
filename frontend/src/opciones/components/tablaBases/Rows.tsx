import "./Rows.css";
import { OpcionesPrimaCant } from "../../../types";
import { DeleteIcon } from "../../../icons/DeleteIcon";

type Props = {
  base: number;
  operaciones: OpcionesPrimaCant[];
  handleOnChangePrCant: (
    e: React.ChangeEvent<HTMLInputElement>,
    base: number,
    tipo: "call" | "put"
  ) => void;
  tipo: "call" | "put";
  handleOnClickDeleteOper: (
    base: number,
    tipo: "call" | "put",
    id: string
  ) => void;
};

export const Rows = ({
  base,
  operaciones,
  handleOnChangePrCant,
  tipo,
  handleOnClickDeleteOper,
}: Props) => {
  return (
    <>
      {operaciones.map((oper, index) => {
        let { id, cantidad, prima } = oper;

        return (
          <tr className="rows" key={index}>
            <td className="td-tableOption">
              <input
                id={id}
                name="cantidad"
                type="number"
                className="input-row"
                value={cantidad ? cantidad : ""}
                onChange={(e) => handleOnChangePrCant(e, base, tipo)}
              />
            </td>
            <td className="td-tableOption">
              <input
                id={id}
                name="prima"
                type="number"
                className="input-row"
                value={prima ? prima : ""}
                onChange={(e) => handleOnChangePrCant(e, base, tipo)}
              />
            </td>
            <td className="td-tableOption">
              <span>
                {prima && cantidad
                  ? redondearDecimales(+prima * +cantidad * 100, 2)
                  : ""}
              </span>
            </td>
            <td style={{ width: "0px" }}>
              <button
                className="delete-operation"
                onClick={() => handleOnClickDeleteOper(base, tipo, id)}
              >
                <DeleteIcon />
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

function redondearDecimales(numero: number, decimales: number) {
  let numeroRegexp = new RegExp("\\d\\.(\\d){" + decimales + ",}"); // Expresion regular para numeros con un cierto numero de decimales o mas
  if (numeroRegexp.test(numero.toString())) {
    // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
    return Number(numero.toFixed(decimales));
  } else {
    return Number(numero.toFixed(decimales)) === 0 ? 0 : numero; // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
  }
}
