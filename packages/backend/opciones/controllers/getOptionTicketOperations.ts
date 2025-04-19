import { Request, Response, NextFunction } from "express";
import { Option } from "../models/options";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

type response = {
  [key: number]: {
    type?: string | null;
    price?: number | null;
    quantity?: number | null;
    id: string;
  }[];
};
export const getOptionTicketOperations = async (
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
    if (!id) {
      let err = new Error("missing parameter");
      err.name = "MissingParameterError";
      throw err;
    }
    const result = await Option.findById(id).populate("operations");
    console.log("result", result);

    if (!result) {
      let err = new Error("Option not found");
      err.name = "NotFoundError";
      throw err;
    }

    let { operations } = result.toJSON();

    let data: response = [];

    /*operations.forEach((operation) => {
      let { type, prima, quantity, base, id } = operation;
      if (base && id) {
        if (!data[base]) data[base] = [];
        data[base].push({
          type,
          price: prima,
          quantity,
          id,
        });
      }
    });*/

    res.status(200).json(data).end();
    return;
  } catch (error) {
    next(error);
  } finally {
    await BDConnection.connection.close();
  }
};
