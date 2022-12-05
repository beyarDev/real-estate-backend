import db from './dbconnection';
import format from 'pg-format';

interface data {
   categories:[],
   counties:[],
   estatesToRent: [],
   estatesToSell: [],
   users: [] 
}
async function seed(data:data) {
	const { categories, counties, estatesToRent, estatesToSell,users } = data;
	await db.query(`DROP TABLE IF EXISTS estates_toRent;`);
	await db.query(`DROP TABLE IF EXISTS estates_toSell;`);
	await db.query(`DROP TABLE IF EXISTS users;`);
	await db.query(`DROP TABLE IF EXISTS categories;`);
    await db.query(`DROP TABLE IF EXISTS counties;`);

	const categoriesTablePromise = db.query(`
  CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    estate_type VARCHAR NOT NULL,
    description VARCHAR NOT NULL
  );`);

	const usersTablePromise = db.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
	username VARCHAR NOT NULL,
    avatar_url VARCHAR
  );`);
	const countiesTablePromise = db.query(`
	CREATE TABLE counties (
	id SERIAL PRIMARY KEY,
	county VARCHAR NOT NULL
	)`)

	await Promise.all([categoriesTablePromise, usersTablePromise,countiesTablePromise]);

	await db.query(`
  CREATE TABLE estates_toRent (
    estate_id SERIAL PRIMARY KEY,
    bedrooms INT NOT NULL,
    estate_type VARCHAR NOT NULL REFERENCES categories(estate_type),
    owner VARCHAR NOT NULL REFERENCES users(username),
	owner_id VARCHAR NOT NULL REFERENCES users(user_id),
    description VARCHAR,
    street VARCHAR NOT NULL,
	neighbourhood VARCHAR NOT NULL,
	city VARCHAR NOT NULL,
	county VARCHAR NOT NULL REFERENCES counties(county)
    created_at TIMESTAMP DEFAULT NOW(),
    price INT NOT NULL,
	modified_at TIMESTAMP,
	area_m2 INT NOT NULL,
  );`);

  await db.query(`
  CREATE TABLE estates_toSell (
    estate_id SERIAL PRIMARY KEY,
    bedrooms INT NOT NULL,
    estate_type VARCHAR NOT NULL REFERENCES categories(estate_type),
    owner VARCHAR NOT NULL REFERENCES users(username),
	owner_id VARCHAR NOT NULL REFERENCES users(user_id),
    description VARCHAR,
    street VARCHAR NOT NULL,
	neighbourhood VARCHAR NOT NULL,
	city VARCHAR NOT NULL,
	county VARCHAR NOT NULL REFERENCES counties(county)
    created_at TIMESTAMP DEFAULT NOW(),
    price INT NOT NULL,
	modified_at TIMESTAMP,
	area_m2 INT NOT NULL,
	sold BOOLEAN DEFAULT false,
	sold_price INT DEFAULT 0,
	sold_date TIMESTAMP
  );`);

  const rentImagesTable = db.query(`
  CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  image_link VARCHAR,
  estate_id REFERENCES estates_toRent(estate_id)
  )`)
  const sellImagesTable = db.query(`
  CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  image_link VARCHAR,
  estate_id REFERENCES estates_toSell(estate_id)
  )`)
  await rentImagesTable
  await sellImagesTable
	const insertCouniesQueryStr = format(
		"INSERT INTO counties (county) VALUES % L;",
		counties.map(({county})=> [county])
	)
	await db.query(insertCouniesQueryStr)

	const insertCategoriesQueryStr = format(
		"INSERT INTO categories (estate_type, description) VALUES %L;",
		categories.map(({ estate_type, description }) => [estate_type, description])
	);
	
	await db.query(insertCategoriesQueryStr)

	const insertUsersQueryStr = format(
		"INSERT INTO users ( user_id, username, name, avatar_url) VALUES %L;",
		users.map(({ username, name, avatar_url, user_id }) => [
			user_id,
			username,
			name,
			avatar_url,
		])
	);
	await db.query(insertUsersQueryStr)

	// const formattedReviewData = reviewData.map(convertTimestampToDate);

	const insertEstatesToRentQueryStr = format(
		"INSERT INTO estates_ToRent (price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner, owner_id, created_at, modified_at, estate_type,images) VALUES %L;",
		estatesToRent.map(
			({price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner, owner_id, created_at, modified_at, estate_type,images
			}) => [
				price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner, owner_id, created_at, modified_at, estate_type
			]
		)
	);

	await db.query(insertEstatesToRentQueryStr)
	
	const insertEstatesToSellQueryStr = format(
		"INSERT INTO estates_ToSell (price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner, owner_id, created_at, modified_at, estate_type, sold, sold_price, sold_date,images) VALUES %L;",
		estatesToSell.map(
			({price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner, owner_id, created_at, modified_at, estate_type, sold, sold_price, sold_date}) => [
				price, description, area_m2, bedrooms, street, city, neighbourhood, county, owner, owner_id, created_at, modified_at, estate_type, sold, sold_price, sold_date
			]
		)
	);
	await db.query(insertEstatesToSellQueryStr)
};