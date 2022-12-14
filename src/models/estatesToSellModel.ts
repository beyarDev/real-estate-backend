import db from "../db-seeding/dbconnection";
import { EstateToSellRow } from "../db-seeding/data/tableInterfaces";

// db queries
async function fetchSellEstates() {
  const { rows } = await db.query("SELECT * FROM estates_tosell");
  return rows;
}

async function fetchSellEstateById(estateId: string) {
  const { rows, rowCount } = await db.query(
    `SELECT * FROM estates_tosell WHERE estate_id = $1`,
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

async function addEstateTOSell({
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
}: EstateToSellRow) {
  const { rows } = await db.query(
    `INSERT INTO estates_tosell (bedrooms,sold,sold_date,sold_price,street,estate_type,area_m2,created_at,modified_at,county,owner_id,city,description,neighbourhood,price)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
    [
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
    ]
  );
  return rows[0];
}

export { fetchSellEstates, addEstateTOSell, fetchSellEstateById };
