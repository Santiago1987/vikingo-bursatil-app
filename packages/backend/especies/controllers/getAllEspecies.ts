import { Request, Response, NextFunction } from "express";
import { Especie } from "../models/especies";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

export const getAllEspecies = async (
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
    const especies = await Especie.find();
    res.status(200).json(especies).end();
    return;
  } catch (error) {
    next(error);
  } finally {
    await BDConnection.connection.close();
  }
};
