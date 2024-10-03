import "./Rows.css";
import { OpcionesPrimaCant } from "../../../types";

type Props = {
  base: number;
  operaciones: OpcionesPrimaCant[];
  handleOnChangePrCant: (
    e: React.ChangeEvent<HTMLInputElement>,
    base: number,
    tipo: "call" | "put"
  ) => void;
  tipo: "call" | "put";
};

export const Rows = ({
  base,
  operaciones,
  handleOnChangePrCant,
  tipo,
}: Props) => {
  const handleClickTd = (
    event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
  ) => {
    //RECUPERO EL TD DONDE SE HIZO CLICK
    const td = event.currentTarget;
    //RECUPERO EL INPUT Y EL SPAN DE ESE TD
    const input = td.querySelector("input");
    const span = td.querySelector("span");

    if (!input || !span) return;
    //HAGO FOCUS EN EL INPUT PARA QUE SE APLIQUE LOS ESTILOS
    input.focus();
    span.style.opacity = "0";

    //evento blur: cuando el input pierde el focus
    input.addEventListener(
      "blur",
      () => {
        //TODO: evaluar si cambio el input para evitar refrezcar el state
        //if(input.value === state)

        span.style.opacity = "1";
      },
      { once: true }
    );
    //once true: para que el evento solo actue una vez
  };
  return (
    <>
      {operaciones.map((oper, index) => {
        let { id, cantidad, prima } = oper;

        return (
          <tr className="rows" key={index}>
            <td className="td-tableOption" onClick={handleClickTd}>
              <input
                id={id}
                name="cantidad"
                type="text"
                className="input-row"
                value={cantidad ? cantidad : ""}
                onChange={(e) => handleOnChangePrCant(e, base, tipo)}
              />
            </td>
            <td className="td-tableOption" onClick={handleClickTd}>
              <input
                id={id}
                name="prima"
                type="text"
                className="input-row"
                value={prima ? prima : ""}
                onChange={(e) => handleOnChangePrCant(e, base, tipo)}
              />
            </td>
            <td className="td-tableOption">
              <span>
                {prima && cantidad
                  ? redondearDecimales(+prima * +cantidad, 2)
                  : ""}
              </span>
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
