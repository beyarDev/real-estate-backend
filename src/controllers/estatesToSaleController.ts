import { Request, Response, NextFunction } from "express";
import {
  fetchSaleEstates,
  addEstateTOSale,
  fetchSaleEstateById,
} from "../models/estatesToSaleModel";

async function getSaleEstates(req: Request, res: Response, next: NextFunction) {
  try {
    const estates = await fetchSaleEstates();
    res.status(200).send({ estates });
  } catch (err) {
    next(err);
  }
}

async function getSaleEstateById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { estateId } = req.params;
    const estate = await fetchSaleEstateById(estateId);
    res.status(200).send({ estate });
  } catch (error) {
    next(error);
  }
}

async function postEstateToSale(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const estateToAdd = req.body;
    const addedEstate = await addEstateTOSale(estateToAdd);
    res.status(201).send({ estate: addedEstate });
  } catch (error) {
    next(error);
  }
}

export { getSaleEstates, postEstateToSale, getSaleEstateById };
