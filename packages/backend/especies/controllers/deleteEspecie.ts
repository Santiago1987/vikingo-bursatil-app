import { Request, Response, NextFunction } from "express";
import { Especie } from "../models/especies";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

export const deleteEspecie = async (
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
    //checkin if the ticket already exists
    const especieExists = Boolean(await Especie.findOne({ ticket }));

    if (!especieExists) {
      let error = new Error("Ticket does not exist");
      error.name = "TicketDoesNotExist";
      throw error;
    }

    //deleting the especie
    await Especie.deleteOne({ ticket });

    res.status(200).json({ message: "Especie deleted" }).end();
    return;
  } catch (error) {
    next(error);
  } finally {
    await BDConnection.connection.close();
  }
};
