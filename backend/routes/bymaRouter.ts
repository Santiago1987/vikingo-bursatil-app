import { Router } from "express";
import opcionesHandler, {
  getOpcionesEspecie,
} from "../controllers/Byma/opcionesHandler";

const bymaRouter = Router();

bymaRouter
  .get("/opciones", opcionesHandler)
  .get("/opciones/:especie", getOpcionesEspecie)
  .get("/opciones/:especie/ti");

export default bymaRouter;
