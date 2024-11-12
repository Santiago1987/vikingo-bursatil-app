import axios from "axios";
import {
  opcionesValue,
  setOpcionesValues,
} from "../../utils/globales/bymaData";
import { NextFunction, Request, Response } from "express";
import { opcionesBYMA } from "../../types";
import { getStock } from "./panelLiderHandler";

//OBTENGO TODAS LAS OPCIONES DE TODAS LAS ESPCIES DE BYMA
export default function opcionesHandler() {
  let body = { "Content-Type": "application/json" };

  let headers = { "Content-Type": "application/json" };

  axios
    .post(
      "https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/options",
      body,
      { headers }
    )
    .then((response) => {
      let { data } = response;
      setOpcionesValues({ data, isupd: true });
    })
    .catch((error) => {
      if (!opcionesValue) return;
      setOpcionesValues({ ...opcionesValue, isupd: false });
      console.error("NO SE PUDO OBTENER LOS DATOS DE OPCIONES", error);
    });
}

// OPCIONES DE UNA DETERMINADA ESPECIE
export function getOpcionesEspecie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!opcionesValue) {
      let error = new Error();
      error.name = "opcionesNoData";
      throw error;
    }

    let { especie } = req.params;

    if (!especie) {
      let error = new Error();
      error.name = "missingParameter";
      throw error;
    }

    let { data } = opcionesValue;

    let result = data.filter((el) => el.underlyingSymbol === especie);

    if (!result) {
      res.status(200).send([]).end();
    }

    return res.status(200).send(result).end();
  } catch (error) {
    next(error);
  }
}

// TASA DE INTERES IMPILICITA DE UNA DETERMINADA ESPECIE
export function getTasaDeInteres(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let result = {};
    if (!opcionesValue) {
      let error = new Error();
      error.name = "opcionesNoData";
      throw error;
    }

    let { especie } = req.params;

    if (!especie) {
      let error = new Error();
      error.name = "missingParameter";
      throw error;
    }

    let { data } = opcionesValue;
    let list = data.filter((el) => el.underlyingSymbol === especie);

    if (!list) {
      return res.status(400).send({ message: "NO DATA" }).end();
    }

    let { underlyingSymbol } = list[0];

    let stock = getStock(underlyingSymbol);

    if (!stock) {
      return res.status(400).send({ message: "NO DATA" }).end();
    }

    let { trade: currVal } = stock;
    for (let el of list) {
      let { symbol, volume, trade, daysToMaturity } = el;

      let type = symbol.charAt(3);
      let base = symbol.replace(/[ABCDEFGHIJLKMNOPQRSTUVWXYZ.]/gi, "");

      if (base && +volume > 0) {
        if (!result[base]) result[base] = {};
        result[base][type] = trade;

        if (
          (type === "C" && result[base]["V"]) ||
          (type === "V" && result[base]["C"])
        ) {
          let call = result[base]["C"];
          let put = result[base]["V"];

          let tiv =
            (((+base + call - put) / currVal - 1) / daysToMaturity) * 365 * 100;

          result[base].ti = tiv;
        }
      }
    }

    return res.status(200).send(result).end();
  } catch (error) {
    next(error);
  }
}
