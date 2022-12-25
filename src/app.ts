import express, {Application, Express} from 'express'
import {getSellEstates} from './controllers/estatesToSellController'
import {getRentEstates} from "./controllers/estatesToRentController"

const app:Application = express()

app.use(express.json())

app.get("/api/estates-to-sell", getSellEstates)
app.get("/api/estates-to-rent", getRentEstates)

export default app;