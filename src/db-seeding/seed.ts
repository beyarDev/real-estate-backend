import db from "./dbconnection";
import format from "pg-format";
import {
  EstateToRentRow,
  CategoryRow,
  CountyRow,
  EstateToSellRow,
  UserRow,
  ImageRow,
} from "../db-seeding/data/tableInterfaces";

interface data {
  categories: CategoryRow[];
  counties: CountyRow[];
  estatesToRent: EstateToRentRow[];
  estatesToSell: EstateToSellRow[];
  users: UserRow[];
  imagesToRent: ImageRow[];
  imagesToSell: ImageRow[];
}

async function seed(data: data) {
  const {
    categories,
    counties,
    estatesToRent,
    estatesToSell,
    users,
    imagesToRent,
    imagesToSell,
  } = data;
  await db.query(`DROP TABLE IF EXISTS images_tosell`);
  await db.query(`DROP TABLE IF EXISTS images_torent`);
  await db.query(`DROP TABLE IF EXISTS estates_torent;`);
  await db.query(`DROP TABLE IF EXISTS estates_tosell;`);
  await db.query(`DROP TABLE IF EXISTS categories;`);
  await db.query(`DROP TABLE IF EXISTS counties;`);
  await db.query(`DROP TABLE IF EXISTS users;`);

  const categoriesTablePromise = db.query(`
  CREATE TABLE categories (
    id SERIAL,
    estate_type VARCHAR NOT NULL PRIMARY KEY, 
    description VARCHAR NOT NULL
  );`);

  const usersTablePromise = db.query(`
  CREATE TABLE users (
    id SERIAL,
    user_id VARCHAR NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL,
	username VARCHAR NOT NULL,
    avatar_url VARCHAR
  );`);
  const countiesTablePromise = db.query(`
	CREATE TABLE counties (
	id SERIAL,
	county VARCHAR NOT NULL PRIMARY KEY
	)`);

  await Promise.all([
    categoriesTablePromise,
    usersTablePromise,
    countiesTablePromise,
  ]);

  await db.query(`
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

  await db.query(`
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
	sold_date TIMESTAMP NULL
  );`);

  const rentImagesTable = db.query(`
  CREATE TABLE images_torent (
  id SERIAL PRIMARY KEY,
  image_link VARCHAR,
  estate_id INT REFERENCES estates_torent(estate_id)
  )`);
  const sellImagesTable = db.query(`
  CREATE TABLE images_tosell (
  id SERIAL PRIMARY KEY,
  image_link VARCHAR,
  estate_id INT REFERENCES estates_tosell(estate_id)
  )`);
  await rentImagesTable;
  await sellImagesTable;
  const insertCouniesQueryStr = format(
    "INSERT INTO counties (county) VALUES %L;",
    counties.map(({ county }) => [county])
  );
  await db.query(insertCouniesQueryStr);

  const insertCategoriesQueryStr = format(
    "INSERT INTO categories (estate_type, description) VALUES %L;",
    categories.map(({ estate_type, description }) => [estate_type, description])
  );

  await db.query(insertCategoriesQueryStr);

  const insertUsersQueryStr = format(
    "INSERT INTO users ( user_id, username, name, avatar_url) VALUES %L;",
    users.map(({ username, name, avatar_url, user_id }) => [
      user_id,
      username,
      name,
      avatar_url,
    ])
  );
  await db.query(insertUsersQueryStr);

  const insertEstatesToRentQueryStr = format(
    "INSERT INTO estates_torent (price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner_id, created_at, modified_at, estate_type) VALUES %L;",
    estatesToRent.map(
      ({
        price,
        description,
        area_m2,
        bedrooms,
        street,
        city,
        neighbourhood,
        county,
        owner_id,
        created_at,
        modified_at,
        estate_type,
      }) => [
        price,
        description,
        area_m2,
        bedrooms,
        street,
        city,
        neighbourhood,
        county,
        owner_id,
        created_at,
        modified_at,
        estate_type,
      ]
    )
  );

  await db.query(insertEstatesToRentQueryStr);

  const insertEstatesToSellQueryStr = format(
    "INSERT INTO estates_tosell (price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner_id, created_at, modified_at, estate_type, sold, sold_price, sold_date) VALUES %L;",
    estatesToSell.map(
      ({
        price,
        description,
        area_m2,
        bedrooms,
        street,
        city,
        neighbourhood,
        county,
        owner_id,
        created_at,
        modified_at,
        estate_type,
        sold,
        sold_price,
        sold_date,
      }) => [
        price,
        description,
        area_m2,
        bedrooms,
        street,
        city,
        neighbourhood,
        county,
        owner_id,
        created_at,
        modified_at,
        estate_type,
        sold,
        sold_price,
        sold_date,
      ]
    )
  );
  await db.query(insertEstatesToSellQueryStr);

  const insertImagesToRentQueryStr = format(
    "INSERT INTO images_torent (image_link, estate_id) VALUES %L",
    imagesToRent.map(({ image_link, estate_id }) => [image_link, estate_id])
  );

  const insertImagesToSellQueryStr = format(
    "INSERT INTO images_tosell (image_link, estate_id) VALUES %L",
    imagesToSell.map(({ image_link, estate_id }) => [image_link, estate_id])
  );

  await db.query(insertImagesToRentQueryStr);
  return await db.query(insertImagesToSellQueryStr);
}

export default seed;
