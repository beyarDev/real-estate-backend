import request from "supertest";
import db from "../../src/db-seeding/dbconnection";
import app from "../../src/app";
import seed from "../../src/db-seeding/seed";
import data from "../../src/db-seeding/data/index";

beforeEach(async () => {
  await seed(data);
});

afterAll(() => {
  db.end();
});

describe("GET /api/sales/estates", () => {
  test("should return all to sell estates", async () => {
    const {
      body: { estatesToSell },
    } = await request(app).get("/api/sales/estates").expect(200);
    estatesToSell.forEach((estate: {}) => {
      expect(estate).toEqual(
        expect.objectContaining({
          estate_id: expect.any(Number),
          estate_type: expect.any(String),
          county: expect.any(String),
          owner_id: expect.any(String),
          bedrooms: expect.any(Number),
          area_m2: expect.any(Number),
          street: expect.any(String),
          city: expect.any(String),
          created_at: expect.any(String),
          modified_at: expect.any(String),
          price: expect.any(Number),
          sold: expect.any(Boolean),
          sold_price: expect.any(Number),
          description: expect.any(String),
          neighbourhood: expect.any(String),
        })
      );
    });
  });
});
describe("GET /api/sales/estates/:estateId", () => {
  test("should return the estate with the specific ID ", async () => {
    const {
      body: { sellEstate },
    } = await request(app).get("/api/sales/estates/1").expect(200);
    expect(sellEstate).toEqual({
      estate_id: 1,
      bedrooms: 3,
      estate_type: "flat",
      owner_id: "123",
      description: "A nice flat with Balkoni",
      street: "Ibin Siena",
      neighbourhood: "AlSina3a",
      city: "Alqamishley",
      county: "AlHasaka",
      created_at: "2023-03-26T10:43:42.445Z",
      price: 29000,
      modified_at: "2022-11-30T17:57:02.445Z",
      area_m2: 110,
      sold: true,
      sold_price: 28000,
      sold_date: "2023-07-20T04:30:22.445Z",
    });
  });
});
describe("GET /api/rentals/estates", () => {
  test("should return all to rent estates", async () => {
    const {
      body: { estatesToRent },
    } = await request(app).get("/api/rentals/estates").expect(200);
    estatesToRent.forEach((estate: {}) => {
      expect(estate).toEqual({
        estate_id: expect.any(Number),
        bedrooms: expect.any(Number),
        estate_type: expect.any(String),
        owner_id: expect.any(String),
        description: expect.any(String),
        street: expect.any(String),
        neighbourhood: expect.any(String),
        city: expect.any(String),
        county: expect.any(String),
        created_at: expect.any(String),
        price: expect.any(Number),
        modified_at: expect.any(String),
        area_m2: expect.any(Number),
      });
    });
  });
});

describe("GET /api/rentals/estates/:estateId", () => {
  test("should return the estate with the specific ID ", async () => {
    const {
      body: { estateToRent },
    } = await request(app).get("/api/rentals/estates/1").expect(200);
    expect(estateToRent).toEqual({
      estate_id: 1,
      bedrooms: 3,
      estate_type: "flat",
      owner_id: "123",
      description: "A nice flat with balkoni",
      street: "Ibin Siena",
      neighbourhood: "AlAziziye",
      city: "Alqamishley",
      county: "AlHasaka",
      created_at: "2023-03-26T10:43:42.445Z",
      price: 100,
      modified_at: "2022-11-30T17:57:02.445Z",
      area_m2: 110,
    });
  });
});

describe("GET /unavailable path", () => {
  test("should return route not found object", async () => {
    const {
      body: { message },
    } = await request(app).get("/notvalid").expect(404);
    expect(message).toBe("Route not found");
  });
});
