import { Router } from "express";
import opcionesHandler, {
  getOpcionesEspecie,
  getTasaDeInteres,
} from "../controllers/Byma/opcionesHandler";

const bymaRouter = Router();

bymaRouter
  .get("/opciones/:especie", getOpcionesEspecie)
  .get("/opciones/:especie/ti", getTasaDeInteres);

export default bymaRouter;
