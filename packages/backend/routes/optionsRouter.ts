import { Router } from "express";
import {
  getOptionTicketOperations,
  saveOptionOperation,
  getEspecieExercise,
} from "../opciones/cotrollers";

const optionsRouter: Router = Router();

optionsRouter
  .post("/save", saveOptionOperation)
  .get("/exercise/operations/:id", getOptionTicketOperations)
  .get("/exercise/:ticket", getEspecieExercise);

export default optionsRouter;
// This file defines the routes for the "options" resource in the Express application.
