import express, { Application } from "express";
import {
  getSaleEstates,
  postEstateToSale,
  getSaleEstateById,
} from "./controllers/estatesToSaleController";
import {
  getRentEstates,
  getRentEstateById,
  postEstateToRent,
} from "./controllers/estatesToRentController";
import { notFound, sqlErrors } from "./controllers/errorhanlder";
const app: Application = express();

app.use(express.json());
// get routes
app.get("/api/sales/estates", getSaleEstates);
app.get("/api/sales/estates/:estateId", getSaleEstateById);
app.get("/api/rentals/estates", getRentEstates);
app.get("/api/rentals/estates/:estateId", getRentEstateById);

// post routes
app.post("/api/sales/estates", postEstateToSale);
app.post("/api/rentals/estates", postEstateToRent);
app.use(sqlErrors);
app.use(notFound);

export default app;
