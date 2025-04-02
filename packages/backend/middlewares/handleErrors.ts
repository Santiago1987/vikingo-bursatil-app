import { Response, Request, NextFunction } from "express";

const ERROR_HANDLERS = {
  defaultError: (response: Response, error: Error) => {
    response.status(500).json({
      message: error.message,
    });
  },
  TicketAndNameRequired: (response: Response, error: Error) => {
    response.status(400).json({
      message: error.message,
    });
  },
  TicketExists: (response: Response, error: Error) => {
    response.status(400).json({
      message: error.message,
    });
  },
  DatabaseError: (response: Response, error: Error) => {
    response.status(500).json({
      message: error.message,
    });
  },
  EspecieNotFound: (response: Response, error: Error) => {
    response.status(404).json({
      message: error.message,
    });
  },
  TypeError: (response: Response, error: Error) => {
    response.status(400).json({
      message: error.message,
    });
  },
  NotFoundError: (response: Response, error: Error) => {
    response.status(400).json({
      message: error.message,
    });
  },
  MissingParameterError: (response: Response, error: Error) => {
    response.status(400).json({
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

  const handler =
    ERROR_HANDLERS[error.name as keyof typeof ERROR_HANDLERS] ||
    ERROR_HANDLERS.defaultError;

  handler(response, error);
};
