import { Request, Response, NextFunction } from "express";
import { Option } from "../models/options";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

export const saveNewOperation = async (
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
    const { id, base, type, quantity, prima } = req.body;
    if (!id || !base || !type) {
      let err = new Error("missing parameter");
      err.name = "MissingParameterError";
      throw err;
    }
    const option = await Option.updateOne(
      { id },
      { $push: { operations: { base, type, quantity, prima } } }
    );

    const optionUpdated = await Option.findById(id).populate("operations");
    if (!optionUpdated) {
      let err = new Error("Option not found");
      err.name = "OptionNotFoundError";
      throw err;
    }
    console.log("optionUpdated", optionUpdated);
    res.status(201).json(optionUpdated).end();
  } catch (error) {
    next(error);
  } finally {
    await BDConnection.connection.close();
  }
};
