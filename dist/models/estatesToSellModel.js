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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEstateTOSell = exports.fetchSellEstates = void 0;
const dbconnection_1 = __importDefault(require("../db-seeding/dbconnection"));
function fetchSellEstates() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield dbconnection_1.default.query("SELECT * FROM estates_tosell");
        return rows;
    });
}
exports.fetchSellEstates = fetchSellEstates;
function addEstateTOSell({ bedrooms, sold, sold_date, sold_price, street, estate_type, area_m2, created_at, modified_at, county, owner_id, city, description, neighbourhood, price, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield dbconnection_1.default.query(`INSERT INTO estates_tosell (bedrooms,sold,sold_date,sold_price,street,estate_type,area_m2,created_at,modified_at,county,owner_id,city,description,neighbourhood,price)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`, [
            bedrooms,
            sold,
            sold_date,
            sold_price,
            street,
            estate_type,
            area_m2,
            created_at,
            modified_at,
            county,
            owner_id,
            city,
            description,
            neighbourhood,
            price,
        ]);
        return rows[0];
    });
}
exports.addEstateTOSell = addEstateTOSell;
