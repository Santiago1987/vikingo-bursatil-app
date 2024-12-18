import express from "express";
import cors from "cors";
import axios from "axios";
import { connectiondb } from "./mongodb";
import fs from "fs";
import https from "https";
import notFound from "./middleware/notFound";
import handleErrors from "./middleware/handleErrors";
import bymaRouter from "./routes/bymaRouter";
import opcionesHandler from "./controllers/Byma/opcionesHandler";
import panelLiderHandler from "./controllers/Byma/panelLiderHandler";

https.globalAgent.options.ca = fs.readFileSync(
  "node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem"
);
//const connectionString = "mongodb://localhost:27017/vikingoBursatilDB";
//connectiondb(connectionString);

//MIDDELWARE
const app = express();
app.use(cors());

//GETTING DATA BYMA
opcionesHandler();
panelLiderHandler();

app.use("/api/opciones/:especie", (req, res) => {
  return res.status(200).json({}).end();
});

app.get("/api/byma/cedears", (req, res) => {
  let data = {
    excludeZeroPxAndQty: true,
    T1: true,
    T0: true,
    "Content-Type": "application/json",
  };

  let headers = {
    "Content-Type": "application/json",
  };

  return axios
    .post(
      "https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/cedears",
      data,
      { headers }
    )
    .then((response) => {
      res.status(response.status).send(response.data).end();
    })
    .catch((error) => {
      console.error("ERRORRRRR", error);
      res.status(400).send(error).end();
    });
});

app.use("/api/byma", bymaRouter);

//ERROR MIDDELWARE
app.use(notFound);
app.use(handleErrors);

//SERVER CONFIGURATIONS
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
