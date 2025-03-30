import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_LOCAL_URI, MONGO_LOCAL_URI_TEST, NODE_ENV } = process.env;
const localConnectionString =
  NODE_ENV === "test" ? MONGO_LOCAL_URI_TEST : MONGO_LOCAL_URI;

export function getLocalConnection() {
  if (!localConnectionString) {
    throw new Error("MONGO_LOCAL_URI is not defined");
  }
  return mongoose
    .connect(localConnectionString)
    .then((connection) => {
      return connection;
    })
    .catch((error) => {
      console.error("Error connecting to local database", error);
      throw new Error("Error connecting to local database");
    });
}
