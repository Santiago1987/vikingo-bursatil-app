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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//test
