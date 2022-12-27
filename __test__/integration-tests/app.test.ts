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

describe("GET /api/estates-to-sell", () => {
  test("should return all to sell estates", async () => {
    const {
      body: { estatesToSell },
    } = await request(app).get("/api/estates-to-sell").expect(200);
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

describe("GET /api/estates-to-rent", () => {
  test("should return all to rent estates", async () => {
    const {
      body: { estatesToRent },
    } = await request(app).get("/api/estates-to-rent").expect(200);
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

describe("GET /unavailable path", () => {
  test("should return route not found object", async () => {
    const {
      body: { message },
    } = await request(app).get("/notvalid").expect(404);
    expect(message).toBe("Route not found");
  });
});
