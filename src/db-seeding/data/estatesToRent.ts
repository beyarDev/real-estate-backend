import { EstateToRentRow } from "./tableInterfaces"

const estatesToRent:EstateToRentRow[] = [
    {
        estate_type: "flat",
        county: "AlHasaka",
        owner: "Thor",
        owner_id: 123,
        bedrooms: 3,
        area_m2: 110,
        street: "Ibin Siena",
        city: "Alqamishley",
        created_at: new Date(1679831022445),
        modified_at: new Date(1669831022445),
        price: 100,
        description: "A nice flat with balkoni",
        neighbourhood: "AlAziziye"
    },
    {
        estate_type: "flat",
        county: "Damascus",
        owner: "Thor",
        owner_id: 123,
        bedrooms: 2,
        area_m2: 90,
        street: "Ibin Siena",
        city: "Reken Aldin",
        created_at: new Date(1675831022445),
        modified_at: new Date(1669831022445),
        price: 350,
        description: "A nice flat with balkoni",
        neighbourhood: "AlAziziye"
    },
    {
        estate_type: "house",
        county: "Raqa",
        owner: "Kang",
        owner_id: 789,
        bedrooms: 5,
        area_m2: 220,
        street: "Ibin Siena",
        city: "AlRaqa",
        created_at: new Date(1673831022445),
        modified_at: new Date(1669831022445),
        price: 300,
        description: "A nice flat with balkoni",
        neighbourhood: "AlAziziye"
    }
]

module.exports = estatesToRent