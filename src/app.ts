import express, { Application, Express } from "express";
import {
  getSellEstates,
  postEstateToSell,
  getSellEstateById,
} from "./controllers/estatesToSellController";
import {
  getRentEstates,
  getRentEstateById,
} from "./controllers/estatesToRentController";
import { notFound, sqlErrors } from "./controllers/errorhanlder";
const app: Application = express();

app.use(express.json());
// get routes
app.get("/api/sales/estates", getSellEstates);
app.get("/api/sales/estates/:estateId", getSellEstateById);
app.get("/api/rentals/estates", getRentEstates);
app.get("/api/rentals/estates/:estateId", getRentEstateById);

// post routes
app.post("/api/sales/estates", postEstateToSell);

app.use(sqlErrors);
app.use(notFound);

export default app;
