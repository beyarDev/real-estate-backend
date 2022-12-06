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
const dbconnection_1 = __importDefault(require("./dbconnection"));
const pg_format_1 = __importDefault(require("pg-format"));
function seed(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { categories, counties, estatesToRent, estatesToSell, users, imagesToRent, imagesToSell } = data;
        yield dbconnection_1.default.query(`DROP TABLE IF EXISTS images_tosell`);
        yield dbconnection_1.default.query(`DROP TABLE IF EXISTS images_torent`);
        yield dbconnection_1.default.query(`DROP TABLE IF EXISTS estates_torent;`);
        yield dbconnection_1.default.query(`DROP TABLE IF EXISTS estates_tosell;`);
        yield dbconnection_1.default.query(`DROP TABLE IF EXISTS categories;`);
        yield dbconnection_1.default.query(`DROP TABLE IF EXISTS counties;`);
        yield dbconnection_1.default.query(`DROP TABLE IF EXISTS users;`);
        const categoriesTablePromise = dbconnection_1.default.query(`
  CREATE TABLE categories (
    id SERIAL,
    estate_type VARCHAR NOT NULL PRIMARY KEY, 
    description VARCHAR NOT NULL
  );`);
        const usersTablePromise = dbconnection_1.default.query(`
  CREATE TABLE users (
    id SERIAL,
    user_id VARCHAR NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL,
	username VARCHAR NOT NULL,
    avatar_url VARCHAR
  );`);
        const countiesTablePromise = dbconnection_1.default.query(`
	CREATE TABLE counties (
	id SERIAL,
	county VARCHAR NOT NULL PRIMARY KEY
	)`);
        yield Promise.all([categoriesTablePromise, usersTablePromise, countiesTablePromise]);
        yield dbconnection_1.default.query(`
  CREATE TABLE estates_torent (
    estate_id SERIAL PRIMARY KEY,
    bedrooms INT NOT NULL,
    estate_type VARCHAR NOT NULL REFERENCES categories(estate_type),
	owner_id VARCHAR NOT NULL REFERENCES users(user_id),
    description VARCHAR,
    street VARCHAR NOT NULL,
	neighbourhood VARCHAR NOT NULL,
	city VARCHAR NOT NULL,
	county VARCHAR NOT NULL REFERENCES counties(county),
    created_at TIMESTAMP DEFAULT NOW(),
    price INT NOT NULL,
	modified_at TIMESTAMP,
	area_m2 INT NOT NULL
  );`);
        yield dbconnection_1.default.query(`
  CREATE TABLE estates_tosell (
    estate_id SERIAL PRIMARY KEY,
    bedrooms INT NOT NULL,
    estate_type VARCHAR NOT NULL REFERENCES categories(estate_type),
	owner_id VARCHAR NOT NULL REFERENCES users(user_id),
    description VARCHAR,
    street VARCHAR NOT NULL,
	neighbourhood VARCHAR NOT NULL,
	city VARCHAR NOT NULL,
	county VARCHAR NOT NULL REFERENCES counties(county),
    created_at TIMESTAMP DEFAULT NOW(),
    price INT NOT NULL,
	modified_at TIMESTAMP,
	area_m2 INT NOT NULL,
	sold BOOLEAN DEFAULT false,
	sold_price INT DEFAULT 0,
	sold_date TIMESTAMP
  );`);
        const rentImagesTable = dbconnection_1.default.query(`
  CREATE TABLE images_torent (
  id SERIAL PRIMARY KEY,
  image_link VARCHAR,
  estate_id INT REFERENCES estates_torent(estate_id)
  )`);
        const sellImagesTable = dbconnection_1.default.query(`
  CREATE TABLE images_tosell (
  id SERIAL PRIMARY KEY,
  image_link VARCHAR,
  estate_id INT REFERENCES estates_tosell(estate_id)
  )`);
        yield rentImagesTable;
        yield sellImagesTable;
        const insertCouniesQueryStr = (0, pg_format_1.default)("INSERT INTO counties (county) VALUES %L;", counties.map(({ county }) => [county]));
        yield dbconnection_1.default.query(insertCouniesQueryStr);
        const insertCategoriesQueryStr = (0, pg_format_1.default)("INSERT INTO categories (estate_type, description) VALUES %L;", categories.map(({ estate_type, description }) => [estate_type, description]));
        yield dbconnection_1.default.query(insertCategoriesQueryStr);
        const insertUsersQueryStr = (0, pg_format_1.default)("INSERT INTO users ( user_id, username, name, avatar_url) VALUES %L;", users.map(({ username, name, avatar_url, user_id }) => [
            user_id,
            username,
            name,
            avatar_url,
        ]));
        yield dbconnection_1.default.query(insertUsersQueryStr);
        // 	// const formattedReviewData = reviewData.map(convertTimestampToDate);
        const insertEstatesToRentQueryStr = (0, pg_format_1.default)("INSERT INTO estates_torent (price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner_id, created_at, modified_at, estate_type) VALUES %L;", estatesToRent.map(({ price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner_id, created_at, modified_at, estate_type }) => [
            price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner_id, created_at, modified_at, estate_type
        ]));
        yield dbconnection_1.default.query(insertEstatesToRentQueryStr);
        const insertEstatesToSellQueryStr = (0, pg_format_1.default)("INSERT INTO estates_tosell (price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner_id, created_at, modified_at, estate_type, sold, sold_price, sold_date) VALUES %L;", estatesToSell.map(({ price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner_id, created_at, modified_at, estate_type, sold, sold_price, sold_date }) => [
            price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner_id, created_at, modified_at, estate_type, sold, sold_price, sold_date
        ]));
        yield dbconnection_1.default.query(insertEstatesToSellQueryStr);
        // 	const insertImagesToRentQueryStr = format("INSERT INTO images_torent (image_link, estate_id) VALUES %L", imagesToRent.map((image_link,estate_id)=> [image_link,estate_id]))
        // 	const insertImagesToSellQueryStr = format("INSERT INTO images_tosell (image_link, estate_id) VALUES %L", imagesToSell.map((image_link,estate_id)=> [image_link,estate_id]))
        // 	await db.query(insertImagesToRentQueryStr)
        // 	return await db.query(insertImagesToSellQueryStr)
    });
}
;
exports.default = seed;
