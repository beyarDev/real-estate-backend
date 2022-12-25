import db from "../db-seeding/dbconnection";

async function fetchRentEstates() {
  const { rows } = await db.query("SELECT * FROM estates_torent");
  return rows;
}

export { fetchRentEstates };
