import mongoose from "mongoose";

const localConnectionString = process.env.MONGO_LOCAL_URI;
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
