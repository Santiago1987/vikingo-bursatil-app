import { Request, Response, NextFunction, request } from "express";

export default (request: Request, response: Response, next: NextFunction) => {
  response
    .status(404)
    .json({
      message: "Not Found",
    })
    .end();
};
