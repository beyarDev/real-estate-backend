import db from '../db-seeding/dbconnection';

async function fetchSellEstates(){
    const {rows} = await db.query("SELECT * FROM estates_tosell")
    return rows
}

export {fetchSellEstates}