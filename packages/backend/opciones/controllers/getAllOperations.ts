import { Request, Response, NextFunction } from "express";
import { Option } from "../models/options";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

export const getAllOperations = async (
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
    //console.log("id", id);

    let result = await Option.findById(id).populate("operations");

    console.log("resssss", result);
    if (!result) {
      let err = new Error("Option not found");
      err.name = "NotFoundError";
      throw err;
    }

    res.status(200).json(result.operations).end();
  } catch (error) {
    next(error);
  } finally {
    await DBConnection.connection.close();
  }
};
