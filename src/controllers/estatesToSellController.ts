import { Request, Response, NextFunction } from "express";
import {
  fetchSellEstates,
  addEstateTOSell,
  fetchSellEstateById,
} from "../models/estatesToSellModel";

async function getSellEstates(req: Request, res: Response, next: NextFunction) {
  try {
    const estatesToSell = await fetchSellEstates();
    res.status(200).send({ estatesToSell });
  } catch (err) {
    next(err);
  }
}

async function getSellEstateById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { estateId } = req.params;
    const sellEstate = await fetchSellEstateById(estateId);
    res.status(200).send({ sellEstate });
  } catch (error) {
    next(error);
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

export { getSellEstates, postEstateToSell, getSellEstateById };
