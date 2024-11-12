import { Request, Response, NextFunction } from "express";
import { PanelLider, stock } from "../../types";
import { setPanelLider, panelLider } from "../../utils/globales/bymaData";
import axios from "axios";

// OBTENGO LOS VALORES DEL PANEL LIDER PARA LA GLOBAL panelLider
export default function panelLiderHandler() {
  let body = {
    excludeZeroPxAndQty: true,
    T1: true,
    T0: true,
    "Content-Type": "application/json",
  };

  let headers = { "Content-Type": "application/json" };

  axios
    .post(
      "https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/leading-equity",
      body,
      { headers }
    )
    .then((response) => {
      let { data } = response;
      let datax = data.data;
      setPanelLider({ data: datax, isupd: true });
    })
    .catch((error) => {
      if (!panelLider) return;
      setPanelLider({ ...panelLider, isupd: false });
      console.error("NO SE PUDO OBTENER LOS DATOS DEL PANEL LIDER", error);
    });
}

// FUNCION PARA OBTENER LOS VALORES DE UNA ACCION EN ESPECIFICO
export function getStock(stock: string): stock | undefined {
  if (!panelLider) return undefined;

  let { data } = panelLider;
  let result = data.find((el) => el.symbol === stock);

  if (!result) return undefined;

  return result;
}

//REQUEST FUNCTION FOR A SINGLE STOCK
export function getSockReq(req: Request, res: Response, next: NextFunction) {
  try {
    if (!panelLider) {
      let error = new Error();
      error.name = "panelLiderNoData";
      throw error;
    }

    let { stock } = req.params;

    if (!stock) {
      let error = new Error();
      error.name = "missingParameter";
      throw error;
    }

    let result = getStock(stock);

    if (!result) {
      let error = new Error();
      error.name = "panelLiderNoData";
      throw error;
    }

    res.status(200).send(result).end();
  } catch (error) {
    next(error);
  }
}
