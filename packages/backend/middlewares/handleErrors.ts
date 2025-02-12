import { Response, Request, NextFunction } from "express";

const ERROR_HANDLERS = {
  defaultError: (response: Response, error: Error) => {
    response.status(500).json({
      message: error.message,
    });
  },
};

export default (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(error.name);

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

  handler(response, error);
};
