import { EstateToSellRow } from "./db-seeding/data/tableInterfaces";

interface SaleEstates extends EstateToSellRow {
  image_link?: string;
  estate_id?: string;
}

interface EstateObject extends SaleEstates {
  images: (string | undefined)[];
}

export function aggregateSaleImages(rows: SaleEstates[]) {
  const images = [] as (string | undefined)[];
  rows.forEach((row) => {
    images.push(row.image_link);
  });
  const estateObject = { ...rows[0] } as EstateObject;
  delete estateObject.image_link;
  estateObject.images = images;
  return estateObject;
}

export function createRefSaleImages(rows: EstateObject[]) {
  const estates = [] as EstateObject[];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!estates.find((estate) => estate.estate_id == row.estate_id)) {
      const images = [];
      images.push(row.image_link);
      delete row.image_link;
      row.images = images;
      estates.push(row);
    } else {
      const obj = estates.find((estate) => estate.estate_id == row.estate_id);
      obj?.images.push(row.image_link);
    }
  }
  return estates;
}
