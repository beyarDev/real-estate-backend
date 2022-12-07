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
const supertest_1 = __importDefault(require("supertest"));
const dbconnection_1 = __importDefault(require("../../src/db-seeding/dbconnection"));
const app_1 = __importDefault(require("../../src/app"));
const seed_1 = __importDefault(require("../../src/db-seeding/seed"));
const index_1 = __importDefault(require("../../src/db-seeding/data/index"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, seed_1.default)(index_1.default);
}));
afterAll(() => {
    dbconnection_1.default.end();
});
describe("GET /api/estates-to-sell", () => {
    test("should return all to sell estates", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { estatesToSell } } = yield (0, supertest_1.default)(app_1.default).get("/api/estates-to-sell").expect(200);
        estatesToSell.forEach((estate) => {
            expect(estate).toEqual({
                estate_type: expect.any(String),
                county: expect.any(String),
                owner_id: expect.any(String),
                bedrooms: expect.any(Number),
                area_m2: expect.any(Number),
                street: expect.any(String),
                city: expect.any(String),
                created_at: expect.any(String),
                modified_at: expect.any(String),
                price: expect.any(Number),
                sold: expect.any(Boolean),
                sold_price: expect.any(Number),
                sold_date: null || expect.any(String),
                description: expect.any(String),
                neighbourhood: expect.any(String)
            });
        });
    }));
});
