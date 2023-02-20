"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaleEstateById = exports.postEstateToSale = exports.getSaleEstates = void 0;
const estatesToSaleModel_1 = require("../models/estatesToSaleModel");
function getSaleEstates(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const estatesToSale = yield (0, estatesToSaleModel_1.fetchSaleEstates)();
            res.status(200).send({ estatesToSale });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getSaleEstates = getSaleEstates;
function getSaleEstateById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { estateId } = req.params;
            const estateToSale = yield (0, estatesToSaleModel_1.fetchSaleEstateById)(estateId);
            res.status(200).send({ estateToSale });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getSaleEstateById = getSaleEstateById;
function postEstateToSale(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const estateToAdd = req.body;
            const addedEstate = yield (0, estatesToSaleModel_1.addEstateTOSale)(estateToAdd);
            res.status(201).send({ estate: addedEstate });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.postEstateToSale = postEstateToSale;
