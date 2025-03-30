import { Request, Response, NextFunction } from "express";
import { Especie } from "../models/especies";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

export const deleteAllEspecies = async (
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
    const especies = await Especie.deleteMany({});
    res.status(200).json({ message: "All especies deleted" }).end();
    return;
  } catch (error) {
    next(error);
  } finally {
    await DBConnection.connection.close();
  }
};
