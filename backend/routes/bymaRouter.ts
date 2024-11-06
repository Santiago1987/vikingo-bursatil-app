import { Router } from "express";
import opcionesHandler from "../controllers/Byma/opcionesHandler";

const bymaRouter = Router();

bymaRouter.get("/opciones", opcionesHandler);
