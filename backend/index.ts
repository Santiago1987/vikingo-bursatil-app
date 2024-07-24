import { connectiondb } from "./mongodb";
import { getLastDateRegistered } from "./controllers/especies";

const connectionString = "mongodb://localhost:27017/vikingoBursatilDB";

connectiondb(connectionString);

getLastDateRegistered("AAPL").then((res) => {
  if (!res) return;
  console.log(res.getTime());
});
