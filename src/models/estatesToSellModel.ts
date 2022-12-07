import db from '../db-seeding/dbconnection';

async function fetchAllEstates(){
    const {rows} = await db.query("SELECT * FROM estates_tosell")
    return rows
}

export {fetchAllEstates}