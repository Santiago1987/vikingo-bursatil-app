import { Request, Response, NextFunction } from "express";
import { Option } from "../models/options";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

export const saveNewOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const BDConnection = await getLocalConnection();
  if (!BDConnection) {
    let err = new Error("Error connecting to database");
    err.name = "DatabaseError";
    next(err);
  }

  try {
    const { ticket, expiration } = req.body;

    if (!ticket || !expiration) {
      let err = new Error("missing parameter");
      err.name = "MissingParameterError";
      throw err;
    }

    const exists = await Option.find({ ticket, expiration });
    if (exists.length > 0) {
      let err = new Error("Option already exists");
      err.name = "OptionExists";
      throw err;
    }

    const option = new Option({ ticket, expiration, operations: [] });
    let result = await option.save();
    res.status(201).json(result).end();
    return;
  } catch (error) {
    next(error);
  } finally {
    await BDConnection.connection.close();
  }
};
