import express from "express";
import cors from "cors";
import { connectiondb } from "./mongodb";

const connectionString = "mongodb://localhost:27017/vikingoBursatilDB";
connectiondb(connectionString);

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());

app.use("/api/opciones/:especie", (req, res) => {
  return res.status(200).json({}).end();
});

app.get("/api/byma/cedears", (req, res) => {
  return fetch(
    "https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/cedears",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        excludeZeroPxAndQty: true,
        T1: true,
        T0: true,
        "Content-Type": "application/json",
      }),
    }
  )
    .then((result) => {
      if (!result.ok) res.send({ message: "Cedear: error" }).status(400).end();
      return result.json();
    })
    .then((data) => res.send(JSON.stringify(data)).status(200).end())
    .catch((err) => res.send({ message: "NO HAY CASO" }).status(400).end());
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//test
