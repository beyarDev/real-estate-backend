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
exports.postEstateToSell = exports.getSellEstates = void 0;
const estatesToSellModel_1 = require("../models/estatesToSellModel");
function getSellEstates(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const estatesToSell = yield (0, estatesToSellModel_1.fetchSellEstates)();
            res.status(200).send({ estatesToSell });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getSellEstates = getSellEstates;
function postEstateToSell(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const estateToAdd = req.body;
            const addedEstate = yield (0, estatesToSellModel_1.addEstateTOSell)(estateToAdd);
            res.status(201).send({ estate: addedEstate });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.postEstateToSell = postEstateToSell;
