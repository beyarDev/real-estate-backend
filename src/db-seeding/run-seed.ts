import seed from "./seed";
import data from "./data";
import db from "./dbconnection";

(async () => {
  await seed(data);

  db.end();
})();
