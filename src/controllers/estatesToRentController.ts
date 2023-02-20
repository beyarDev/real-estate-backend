import { Request, Response, NextFunction } from "express";
import {
  fetchRentEstates,
  fetchRentEstateById,
  addEstateTORent,
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

async function postEstateToRent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const estateToAdd = req.body;
    const addedEstate = await addEstateTORent(estateToAdd);
    res.status(201).send({ estate: addedEstate });
  } catch (error) {
    next(error);
  }
}

export { getRentEstates, getRentEstateById, postEstateToRent };
