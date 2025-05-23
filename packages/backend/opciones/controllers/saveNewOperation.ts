import { Request, Response, NextFunction } from "express";
import { Option, Operations } from "../models/options";
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
    let { id, base, type, quantity, prima } = req.body;
    if (!id || !base || !type) {
      let err = new Error("missing parameter");
      err.name = "MissingParameterError";
      throw err;
    }

    quantity ??= 0;
    prima ??= 0;

    const Operation = new Operations({ base, type, quantity, prima });
    const newOperation = await Operation.save();

    console.log("newOperation", newOperation);

    let { _id } = newOperation;
    if (prima < 0) {
      let err = new Error("prima cannot be negative");
      err.name = "NegativePrimaError";
      throw err;
    }

    await Option.findByIdAndUpdate(
      { _id: id },
      { $push: { operations: _id } },
      { new: true }
    );

    if (!newOperation) {
      let err = new Error("Option not found");
      err.name = "OptionNotFoundError";
      throw err;
    }
    res.status(201).json(newOperation).end();
  } catch (error) {
    next(error);
  } finally {
    await BDConnection.connection.close();
  }
};
