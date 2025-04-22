import { Request, Response, NextFunction } from "express";
import { Operations } from "../models/options";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

export const deleteOperation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const DBConnection = await getLocalConnection();
  if (!DBConnection) {
    let err = new Error("Error connecting to database");
    err.name = "DatabaseError";
    next(err);
  }

  try {
    const { id } = req.params;
    if (!id) {
      let err = new Error("missing parameter");
      err.name = "MissingParameterError";
      throw err;
    }

    let result = await Operations.findOneAndDelete({ _id: id });
    if (!result) {
      let err = new Error("Operation not found");
      err.name = "OperationNotFoundError";
      throw err;
    }

    res.status(200).json(result).end();
  } catch (error) {
    next(error);
  } finally {
    DBConnection.connection.close();
  }
};
