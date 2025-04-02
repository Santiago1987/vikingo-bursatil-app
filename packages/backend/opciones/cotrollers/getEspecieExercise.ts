import { Request, Response, NextFunction } from "express";
import { Option } from "../models/options";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

export const getEspecieExercise = async (
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
    const { ticket } = req.params;
    const options = await Option.find({ ticket });
    res.status(200).json(options).end();
    return;
  } catch (error) {
    next(error);
  } finally {
    await BDConnection.connection.close();
  }
};
