import express, { Application, Express } from "express";
import { getSellEstates,postEstateToSell} from "./controllers/estatesToSellController";
import {
  getRentEstates,
  getRentEstateById,
} from "./controllers/estatesToRentController";
import { notFound, sqlErrors } from "./controllers/errorhanlder";
const app: Application = express();

app.use(express.json());
//get routes
app.get("/api/estates-to-sell", getSellEstates);
app.get("/api/estates-to-rent", getRentEstates);
app.get("/api/estate-to-rent/:estateId", getRentEstateById);

//post routes
app.post("/api/estate-to-sell", postEstateToSell)

app.use(sqlErrors);
app.use(notFound);

export default app;
