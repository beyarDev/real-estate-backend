import {Request,Response,NextFunction} from 'express'
import {fetchSellEstates} from '../models/estatesToSellModel'

async function getSellEstates(req:Request,res:Response,next:NextFunction){
  const estatesToSell = await fetchSellEstates()
  res.status(200).send({estatesToSell}) 
}

export {getSellEstates}