"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estatesToSaleController_1 = require("./controllers/estatesToSaleController");
const estatesToRentController_1 = require("./controllers/estatesToRentController");
const errorhanlder_1 = require("./controllers/errorhanlder");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// get routes
app.get("/api/sales/estates", estatesToSaleController_1.getSaleEstates);
app.get("/api/sales/estates/:estateId", estatesToSaleController_1.getSaleEstateById);
app.get("/api/rentals/estates", estatesToRentController_1.getRentEstates);
app.get("/api/rentals/estates/:estateId", estatesToRentController_1.getRentEstateById);
// post routes
app.post("/api/sales/estates", estatesToSaleController_1.postEstateToSale);
app.post("/api/rentals/estates", estatesToRentController_1.postEstateToRent);
app.use(errorhanlder_1.sqlErrors);
app.use(errorhanlder_1.notFound);
exports.default = app;
