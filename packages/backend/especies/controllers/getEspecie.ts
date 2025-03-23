import { Request, Response, NextFunction } from "express";
import { Especie } from "../models/especies.ts";
import { getLocalConnection } from "../../Mongo/getLocalconnection.ts";

export const getEspecie = async (
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
    const especie = await Especie.findById(ticket);
    if (!especie) {
      let error = new Error("Especie not found");
      error.name = "EspecieNotFound";
      throw error;
    }
    res.status(200).json(especie).end();
    return;
  } catch (error) {
    next(error);
  } finally {
    await BDConnection.connection.close();
  }
};
