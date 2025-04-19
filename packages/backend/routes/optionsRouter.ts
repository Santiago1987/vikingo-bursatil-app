import { Router } from "express";
import {
  getOptionTicketOperations,
  saveNewOption,
  getAllEspecieExercises,
  saveNewOperation,
  updateOperation,
  deleteOption,
  getAllOperations,
  deleteOperation,
} from "../opciones/controllers";

const optionsRouter: Router = Router();

optionsRouter
  .post("/save", saveNewOption)
  .get("/exercise/operations/:id", getOptionTicketOperations)
  .get("/exercise/:ticket", getAllEspecieExercises)
  .post("/saveNewOperation", saveNewOperation)
  .put("/updateOperation/:id", updateOperation)
  .delete("/deleteOption/:id", deleteOption)
  .get("/getAllOperations/:id", getAllOperations)
  .delete("/deleteOperation/:id", deleteOperation);

export default optionsRouter;
// This file defines the routes for the "options" resource in the Express application.
