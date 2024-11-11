import axios from "axios";
import {
  opcionesValue,
  setOpcionesValues,
} from "../../utils/globales/bymaData";
import { NextFunction, Request, Response } from "express";

//OBTENGO TODAS LAS OPCIONES DE TODAS LAS ESPCIES DE BYMA
export default function opcionesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let body = { "Content-Type": "application/json" };

  let headers = { "Content-Type": "application/json" };

  return axios
    .post(
      "https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/options",
      body,
      { headers }
    )
    .then((response) => {
      setOpcionesValues(response.data);
      res.status(response.status).send(response.data).end();
    })
    .catch((error) => {
      console.error("ERRORRRRR", error);
      next(error);
    });
}

// OPCIONES DE UNA DETERMINADA ESPECIE
export function getOpcionesEspecie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(opcionesValue.length);
  if (opcionesValue.length === 0) {
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

  let result = opcionesValue.filter((el) => el.underlyingSymbol === especie);

  if (!result) {
    res.status(200).send([]).end();
  }

  return res.status(200).send(result).end();
}

// TASA DE INTERES IMPILICITA DE UNA DETERMINADA ESPECIE
export function getTasaDeInteres(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let result = {};
  if (opcionesValue.length === 0) {
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

  let list = opcionesValue.filter((el) => el.underlyingSymbol === especie);

  for (let el of list) {
    let { symbol, volume, trade, daysToMaturity } = el;

    let type = symbol.charAt(3);
    let base = symbol.replace(/[ABCDEFGHIJLKMNOPQRSTUVWXYZ.]/gi, "");

    if (base && +volume > 0) {
      result[base][type] = trade;

      if (type === "C" && result[base]["V"]) {
        let call = result[base]["C"];
        let put = result[base]["V"];

        let vf = +base + call - put;
      }
    }
  }
}
