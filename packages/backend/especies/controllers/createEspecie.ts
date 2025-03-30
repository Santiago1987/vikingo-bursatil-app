import { Request, Response, NextFunction } from "express";
import { Especie } from "../models/especies";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

export const createEspecie = async (
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
    const { name, ticket } = req.body;

    //checkin if name and ticket are provided
    if (!name || !ticket) {
      let error = new Error("Name and ticket are required");
      error.name = "TicketAndNameRequired";
      throw error;
    }

    //checkin if the ticket already exists
    const especieExists = Boolean(await Especie.findOne({ ticket }));

    if (especieExists) {
      let error = new Error("Ticket already exists");
      error.name = "TicketExists";
      throw error;
    }

    //saving the especie
    const especie = new Especie({ name, ticket });
    const newEspecie = await especie.save();

    res.status(201).json(newEspecie).end();
    return;
  } catch (error) {
    next(error);
  } finally {
    await BDConnection.connection.close();
  }
};
