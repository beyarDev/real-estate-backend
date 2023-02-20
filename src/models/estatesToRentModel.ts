import db from "../db-seeding/dbconnection";
import { EstateToRentRow } from "../db-seeding/data/tableInterfaces";
async function fetchRentEstates() {
  const { rows } = await db.query("SELECT * FROM estates_rentals");
  return rows;
}

async function fetchRentEstateById(estateId: string) {
  const { rows, rowCount } = await db.query(
    `SELECT * FROM estates_rentals WHERE estate_id = $1`,
    [estateId]
  );
  if (rowCount == 0) {
    return Promise.reject({
      message: `${estateId} not found`,
      status: 404,
    });
  }
  return rows[0];
}

async function addEstateTORent({
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
}: EstateToRentRow) {
  const { rows } = await db.query(
    `INSERT INTO estates_rentals (estate_type,county,owner_id,bedrooms,area_m2,street,city,created_at,modified_at,price,description,neighbourhood)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [
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
    ]
  );
  return rows[0];
}

export { fetchRentEstates, fetchRentEstateById, addEstateTORent };
