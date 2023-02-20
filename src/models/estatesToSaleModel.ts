import db from "../db-seeding/dbconnection";
import { EstateToSellRow } from "../db-seeding/data/tableInterfaces";
import { aggregateSaleImages,createRefSaleImages } from "../utils";
// db queries
async function fetchSaleEstates() {
  const { rows } =
    await db.query(`SELECT estates_sales.*,images_tosell.image_link FROM estates_sales
  LEFT JOIN images_tosell on images_tosell.estate_id = estates_sales.estate_id`);
  return createRefSaleImages(rows);
}

async function fetchSaleEstateById(estateId: string) {
  const { rows, rowCount } = await db.query(
    `SELECT estates_sales.*,images_tosell.image_link FROM estates_sales
    LEFT JOIN images_tosell on images_tosell.estate_id = estates_sales.estate_id
    WHERE estates_sales.estate_id = $1;`,
    [estateId]
  );
  if (rowCount == 0) {
    return Promise.reject({
      message: `${estateId} not found`,
      status: 404,
    });
  }
  return aggregateSaleImages(rows);
}

async function addEstateTOSale({
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
    `INSERT INTO estates_sales (bedrooms,sold,sold_date,sold_price,street,estate_type,area_m2,created_at,modified_at,county,owner_id,city,description,neighbourhood,price)
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

export { fetchSaleEstates, addEstateTOSale, fetchSaleEstateById };
