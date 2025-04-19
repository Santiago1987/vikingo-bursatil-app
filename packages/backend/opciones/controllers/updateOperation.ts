import { Request, Response, NextFunction } from "express";
import { Operations } from "../models/options";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

export const updateOperation = async (
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
    const { id } = req.params;
    const { quantity, prima } = req.body;
    if (!id) {
      let err = new Error("missing parameter");
      err.name = "MissingParameterError";
      throw err;
    }

    if (prima < 0) {
      let err = new Error("prima cannot be negative");
      err.name = "NegativePrimaError";
      throw err;
    }

    const result = await Operations.findOneAndUpdate(
      { _id: id },
      { $set: { quantity: quantity, prima: prima } },
      { new: true }
    );
    //console.log("result", result);
    if (!result) {
      let err = new Error("Option not found");
      err.name = "NotFoundError";
      throw err;
    }

    res.status(200).json(result).end();
    return;
  } catch (error) {
    next(error);
  } finally {
    await BDConnection.connection.close();
  }
};
