import mongoose from "mongoose";

export const connectiondb = (connectionString: string) => {
  if (!connectionString) {
    console.log("no string connection provided");
    return;
  }

  try {
    mongoose
      .connect(connectionString)
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error("Conexion con bd fallida: " + err);
  }
};
