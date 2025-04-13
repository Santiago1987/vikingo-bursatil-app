import { Request, Response, NextFunction } from "express";
import { Option } from "../models/options";
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
    const { operID, quantity, prima } = req.body;
    if (!id || !operID) {
      let err = new Error("missing parameter");
      err.name = "MissingParameterError";
      throw err;
    }
    const result = await Option.findOneAndUpdate(
      { _id: id, "data._id": operID },
      { $set: { "data.$.quantity": quantity, "data.$.prima": prima } },
      { new: true }
    );
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
