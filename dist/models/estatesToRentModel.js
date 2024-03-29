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
exports.addEstateTORent = exports.fetchRentEstateById = exports.fetchRentEstates = void 0;
const dbconnection_1 = __importDefault(require("../db-seeding/dbconnection"));
function fetchRentEstates() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield dbconnection_1.default.query("SELECT * FROM estates_rentals");
        return rows;
    });
}
exports.fetchRentEstates = fetchRentEstates;
function fetchRentEstateById(estateId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows, rowCount } = yield dbconnection_1.default.query(`SELECT * FROM estates_rentals WHERE estate_id = $1`, [estateId]);
        if (rowCount == 0) {
            return Promise.reject({
                message: `${estateId} not found`,
                status: 404,
            });
        }
        return rows[0];
    });
}
exports.fetchRentEstateById = fetchRentEstateById;
function addEstateTORent({ estate_type, county, owner_id, bedrooms, area_m2, street, city, created_at, modified_at, price, description, neighbourhood, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield dbconnection_1.default.query(`INSERT INTO estates_rentals (estate_type,county,owner_id,bedrooms,area_m2,street,city,created_at,modified_at,price,description,neighbourhood)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`, [
            estate_type,
            county,
            owner_id,
            bedrooms,
            area_m2,
            street,
            city,
            created_at,
            modified_at,
            price,
            description,
            neighbourhood,
        ]);
        return rows[0];
    });
}
exports.addEstateTORent = addEstateTORent;
