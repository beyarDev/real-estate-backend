import { Request, Response, NextFunction } from "express";
import {
  fetchSellEstates,
  addEstateTOSell,
} from "../models/estatesToSellModel";

async function getSellEstates(req: Request, res: Response, next: NextFunction) {
  try {
    const estatesToSell = await fetchSellEstates();
    res.status(200).send({ estatesToSell });
  } catch (err) {
    next(err);
  }
}

async function postEstateToSell(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const estateToAdd = req.body;
    const addedEstate = await addEstateTOSell(estateToAdd);
    res.status(201).send({ estate: addedEstate });
  } catch (error) {
    next(error);
  }
}

export { getSellEstates, postEstateToSell };
