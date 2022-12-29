import db from "../db-seeding/dbconnection";

async function fetchRentEstates() {
  const { rows } = await db.query("SELECT * FROM estates_torent");
  return rows;
}

async function fetchRentEstateById(estateId: string) {
  const { rows, rowCount } = await db.query(
    `SELECT * FROM estates_torent WHERE estate_id = $1`,
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

export { fetchRentEstates, fetchRentEstateById };
