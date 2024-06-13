/*import { connectiondb } from "./mongodb";
import { getLastDateRegistered } from "./controllers/especies";

const connectionString = "mongodb://localhost:27017/vikingoBursatilDB";

connectiondb(connectionString);

getLastDateRegistered("AAPL").then((res) => {
  if (!res) return;
  console.log(res.getTime());
});*/

/*import { connectiondb } from "./mongodb";
const connectionString = "mongodb://localhost:27017/vikingoBursatilDB";

connectiondb(connectionString);

import { getDataFromFile } from "./utils/importCSV/getDataCSV";

getDataFromFile();*/

/*import { getAcciones } from "./utils/BYMAScrapper/acciones";
getAcciones().then((res) => {
  console.log(res);
});*/

//import { getCedears } from "./utils/BYMAScrapper/cedears";
import { CEDEARList } from "../Types/backend/types";
console.log(CEDEARList);
/*getCedears().then((res) => {
  console.log(Object.keys(CEDEARList));
});*/
