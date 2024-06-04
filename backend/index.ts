import { connectiondb } from "./mongodb";
import { getDataFromFile } from "./utils/importCSV/getDataCSV";

const connectionString = "mongodb://localhost:27017/vikingoBursatilDB";

connectiondb(connectionString);

getDataFromFile()
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.error("err", err);
  });
