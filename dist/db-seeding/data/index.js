"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = __importDefault(require("./categories"));
const counties_1 = __importDefault(require("./counties"));
const estatesToRent_1 = __importDefault(require("./estatesToRent"));
const estatesToSell_1 = __importDefault(require("./estatesToSell"));
const imagesToSell_1 = __importDefault(require("./imagesToSell"));
const imagesToRent_1 = __importDefault(require("./imagesToRent"));
const users_1 = __importDefault(require("./users"));
const data = { categories: categories_1.default, counties: counties_1.default, estatesToRent: estatesToRent_1.default, estatesToSell: estatesToSell_1.default, users: users_1.default, imagesToRent: imagesToRent_1.default, imagesToSell: imagesToSell_1.default };
exports.default = data;
