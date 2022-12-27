"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estatesToSellController_1 = require("./controllers/estatesToSellController");
const estatesToRentController_1 = require("./controllers/estatesToRentController");
const errorhanlder_1 = require("./controllers/errorhanlder");
const app = (0, express_1.default)();
app.use(express_1.default.json());
//get routes
app.get("/api/estates-to-sell", estatesToSellController_1.getSellEstates);
app.get("/api/estates-to-rent", estatesToRentController_1.getRentEstates);
app.get("/api/estate-to-rent/:estateId", estatesToRentController_1.getRentEstateById);
//post routes
app.post("/api/estate-to-sell", estatesToSellController_1.postEstateToSell);
app.use(errorhanlder_1.sqlErrors);
app.use(errorhanlder_1.notFound);
exports.default = app;
