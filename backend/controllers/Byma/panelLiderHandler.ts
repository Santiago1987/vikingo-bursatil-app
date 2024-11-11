import { NextFunction, Request, response, Response } from "express";
import { setPanelLider } from "../../utils/globales/bymaData";
import axios from "axios";

export default function panelLiderHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let body = {
    excludeZeroPxAndQty: true,
    T1: true,
    T0: true,
    "Content-Type": "application/json",
  };

  let headers = { "Content-Type": "application/json" };

  return axios
    .post(
      "https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/leading-equity",
      body,
      { headers }
    )
    .then((response) => {
      setPanelLider(response.data.data);
    })
    .catch((error) => {
      console.error("ERRORRRRR", error);
      next(error);
    });
}
