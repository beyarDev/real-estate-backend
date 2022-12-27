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
exports.getRentEstateById = exports.getRentEstates = void 0;
const estatesToRentModel_1 = require("../models/estatesToRentModel");
function getRentEstates(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const estatesToRent = yield (0, estatesToRentModel_1.fetchRentEstates)();
            res.status(200).send({ estatesToRent });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getRentEstates = getRentEstates;
function getRentEstateById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { estateId } = req.params;
            const estateToRent = yield (0, estatesToRentModel_1.fetchRentEstateById)(estateId);
            res.status(200).send(estateToRent);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getRentEstateById = getRentEstateById;
