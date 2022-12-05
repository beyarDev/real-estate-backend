import { EstateToSellRow } from "./tableInterfaces"

const estatesToSell:EstateToSellRow[] = [
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
        price: 29000,
        sold: false,
        sold_price: 0,
        sold_date: "",
        description: "A nice flat with Balkoni",
        neighbourhood: "AlSina3a"
    },
    {
        estate_type: "flat",
        county: "Damascus",
        owner: "Thor",
        owner_id: 123,
        bedrooms: 2,
        area_m2: 90,
        street: "29 Ayar",
        city: "Alqamishley",
        created_at: new Date(1675831022445),
        modified_at: new Date(1669831022445),
        price: 35000,
        sold: false,
        sold_price: 0,
        sold_date: "",
        description: "small flat suitable for students",
        neighbourhood: "AlSaliheie"
    },
    {
        estate_type: "house",
        county: "Raqa",
        owner: "Galactus",
        owner_id: 456,
        bedrooms: 5,
        area_m2: 240,
        street: "Ibin Siena",
        city: "Alqamishley",
        created_at: new Date(1673831022445),
        modified_at: new Date(1669831022445),
        price: 45923,
        sold: false,
        sold_price: 0,
        sold_date: "",
        description: "Big house with front and back garden",
        neighbourhood: "AlSina3a"
    }
]

module.exports = estatesToSell