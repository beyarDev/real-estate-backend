import { Request, Response, NextFunction } from "express";
import {
  fetchRentEstates,
  fetchRentEstateById,
} from "../models/estatesToRentModel";

async function getRentEstates(req: Request, res: Response, next: NextFunction) {
  try {
    const estatesToRent = await fetchRentEstates();
    res.status(200).send({ estatesToRent });
  } catch (err) {
    next(err);
  }
}

async function getRentEstateById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { estateId } = req.params;
    const estateToRent = await fetchRentEstateById(estateId);
    res.status(200).send({ estateToRent });
  } catch (err) {
    next(err);
  }
}

export { getRentEstates, getRentEstateById };
