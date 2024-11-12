import { ErrorRequestHandler, Response, Request, NextFunction } from "express";

const ERROR_HANDLERS = {
  defaultError: (res: Response) => res.status(500).end(),
  missingParameter: (res: Response) =>
    res.status(401).send({ error: "missing parameters" }).end(),
  opcionesNoData: (res: Response) =>
    res.status(401).send({ error: "opciones no data" }).end(),
  panelLiderNoData: (res: Response) =>
    res.status(401).send({ error: "panle lider no data" }).end(),
};

export default (
  error: Error,
  req: Request,
  res: Response,
  newt: NextFunction
) => {
  console.log(error.name);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

  handler(res, error);

  return;
};
