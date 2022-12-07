import {Request,Response,NextFunction} from 'express'
import {fetchAllEstates} from '../models/estatesToSellModel'

async function getAllEstates(req:Request,res:Response,next:NextFunction){
  const estatesToSell = await fetchAllEstates()
  res.status(200).send({estatesToSell}) 
}

export {getAllEstates}