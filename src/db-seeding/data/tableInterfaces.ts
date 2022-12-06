export interface ImageRow {
    image_link: string,
    estate_id: number
}
export interface EstateToRentRow {
        estate_type: string,
        county: string,
        owner_id: number,
        bedrooms: number,
        area_m2: number,
        street: string,
        city: string,
        created_at: Date,
        modified_at: Date,
        price: number,
        description: string,
        neighbourhood: string,
}

export interface EstateToSellRow {
        estate_type:string,
        county:string,
        owner_id: number,
        bedrooms: number,
        area_m2: number,
        street: string,
        city:string,
        created_at: Date,
        modified_at: Date,
        price: number,
        sold: boolean,
        sold_price: number,
        sold_date:string,
        description: string,
        neighbourhood: string
}
export interface UserRow {
    user_id:string,
    username:string,
    name: string,
    avatar_url:string,
    email: string
}
export interface CategoryRow{
    estate_type: string,
    description:string
}

export interface CountyRow{
    county:string
}