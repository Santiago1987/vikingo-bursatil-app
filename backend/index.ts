/*import { connectiondb } from "./mongodb";
import { getEspecieHistorico } from "./controllers/especies";

const connectionString = "mongodb://localhost:27017/vikingoBursatilDB";

connectiondb(connectionString);

getEspecieHistorico("AAPL")
  .then((res) => console.log(res))
  .catch((err) => console.error(err));*/

import { getDataFromFile } from "./utils/importCSV/getDataCSV";

getDataFromFile();
