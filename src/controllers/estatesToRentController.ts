import { Request, Response, NextFunction } from "express";
import { fetchRentEstates } from "../models/estatesToRentModel";
async function getRentEstates(req: Request, res: Response, next: NextFunction) {
  const estatesToRent = await fetchRentEstates();
  res.status(200).send({ estatesToRent });
}

export { getRentEstates };
