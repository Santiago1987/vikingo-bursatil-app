import "./Rows.css";
import { OpcionesPrimaCant } from "../../../types";

type Props = {
  calls: OpcionesPrimaCant[];
  puts: OpcionesPrimaCant[];
};

export const Rows = ({ calls, puts }: Props) => {
  let master = [];
  let slave = [];

  if (calls.length === 0 && puts.length === 0) {
    return (
      <tr className="rows">
        <td className="td-tableOption">
          <input className="input-row" />
          <span>{}</span>
        </td>
        <td className="td-tableOption">
          <input className="input-row" />
          <span>{}</span>
        </td>
        <td className="td-tableOption">
          <input className="input-row" />
          <span>{}</span>
        </td>
        <td className="td-tableOption">
          <input className="input-row" />
          <span>{}</span>
        </td>
        <td className="td-tableOption">
          <input className="input-row" />
          <span>{}</span>
        </td>
        <td className="td-tableOption">
          <input className="input-row" />
          <span>{}</span>
        </td>
      </tr>
    );
  }

  if (calls.length > puts.length) {
    master = [...calls];
    slave = [...puts];
  } else {
    master = [...puts];
    slave = [...calls];
  }

  return (
    <>
      {master.map((_, index) => {
        let primaCall = calls[index] ? calls[index].prima : "";
        let cantCall = calls[index] ? calls[index].cantidad : "";
        console.log(index, puts[index]);
        let primaPut = puts[index] ? puts[index].prima : "";
        let cantPut = puts[index] ? puts[index].cantidad : "";

        return (
          <tr className="rows" key={index}>
            <td className="td-tableOption">
              <input className="input-row" value={cantCall} />
              <span>{}</span>
            </td>
            <td className="td-tableOption">
              <input className="input-row" value={primaCall} />
              <span>{}</span>
            </td>
            <td className="td-tableOption">
              <input
                className="input-row"
                value={
                  primaCall && cantCall
                    ? redondearDecimales(+primaCall * +cantCall, 2)
                    : ""
                }
              />
              <span>{}</span>
            </td>
            <td className="td-tableOption">
              <input className="input-row" value={cantPut} />
              <span>{}</span>
            </td>
            <td className="td-tableOption">
              <input className="input-row" value={primaPut} />
              <span>{}</span>
            </td>
            <td className="td-tableOption">
              <input
                className="input-row"
                value={
                  primaPut && cantPut
                    ? redondearDecimales(+primaPut * +cantPut, 2)
                    : ""
                }
              />
            </td>
            <span>{}</span>
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
