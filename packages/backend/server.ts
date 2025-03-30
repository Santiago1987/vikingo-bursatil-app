import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import notFound from "./middlewares/notFound";
import handleErrors from "./middlewares/handleErrors";
import { especiesRouter, optionsRouter } from "./routes";
import morgan from "morgan";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/especies", especiesRouter);
app.use("/api/options", optionsRouter);

//Error handling middleware
app.use(notFound);
app.use(handleErrors);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app, server };
//exportamos app y server para poder usarlos en los tests
