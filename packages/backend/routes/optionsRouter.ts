import { Router } from "express";
import {
  getOptionTicketOperations,
  saveNewOption,
  getEspecieExercise,
  saveNewOperation,
  updateOperation,
  deleteOption,
} from "../opciones/cotrollers";

const optionsRouter: Router = Router();

optionsRouter
  .post("/save", saveNewOption)
  .get("/exercise/operations/:id", getOptionTicketOperations)
  .get("/exercise/:ticket", getEspecieExercise)
  .post("/saveNewOperation", saveNewOperation)
  .put("/updateOperation/:id", updateOperation)
  .delete("/deleteOption/:id", deleteOption);

export default optionsRouter;
// This file defines the routes for the "options" resource in the Express application.
