import seed from "./seed";
import data from "./data";
import db from "./dbconnection"

seed(data).then(()=>db.end())