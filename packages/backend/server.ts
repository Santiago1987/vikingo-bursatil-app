import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notFound from "./middlewares/notFound";
import handleErrors from "./middlewares/handleErrors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//-----------------------------------------------
app.use(notFound);
app.use(handleErrors);
