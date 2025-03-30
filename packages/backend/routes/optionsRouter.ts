import { Router } from "express";
import {
  getOptionTicketOperations,
  saveOptionOperation,
} from "../opciones/cotrollers";

const optionsRouter: Router = Router();

optionsRouter
  .post("/save", saveOptionOperation)
  .get("/:ticket/:expiration", getOptionTicketOperations);

export default optionsRouter;
// This file defines the routes for the "options" resource in the Express application.
