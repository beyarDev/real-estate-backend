"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({
    path: `${__dirname}/../../.env.${ENV}`,
});
const config = ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    }
    : {};
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("no database config found");
}
exports.default = new pg_1.Pool(config);
