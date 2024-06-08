/*import { connectiondb } from "./mongodb";
import { getLastDateRegistered } from "./controllers/especies";

const connectionString = "mongodb://localhost:27017/vikingoBursatilDB";

connectiondb(connectionString);

getLastDateRegistered().then((res) => {
  if (!res) return;
  console.log(res.getTime());
});*/

import { connectiondb } from "./mongodb";
const connectionString = "mongodb://localhost:27017/vikingoBursatilDB";

connectiondb(connectionString);

import { getDataFromFile } from "./utils/importCSV/getDataCSV";

getDataFromFile();
