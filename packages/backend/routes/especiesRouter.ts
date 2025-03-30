import { Router } from "express";
import {
  createEspecie,
  getAllEspecies,
  getEspecie,
  deleteEspecie,
  deleteAllEspecies,
} from "../especies/controllers";

const especiesRouter: Router = Router();

especiesRouter
  .post("/save", createEspecie)
  .get("/all", getAllEspecies)
  .get("/:ticket", getEspecie)
  .delete("/deleteAll", deleteAllEspecies)
  .delete("/:ticket", deleteEspecie);

export default especiesRouter;
// This file defines the routes for the "especies" resource in the Express application.
