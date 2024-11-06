import { ErrorRequestHandler, Response, Request, NextFunction } from "express";

const ERROR_HANDLERS: any = {
  defaultError: (res: Response) => res.status(500).end(),
};

export default (
  error: Error,
  req: Request,
  res: Response,
  newt: NextFunction
) => {
  console.log(error.name);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.default;

  handler(res, error);

  return;
};
