import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
