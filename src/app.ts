import express, {Application, Express} from 'express'
import {getAllEstates} from './controller/estatesToSellController'

const app:Application = express()

app.use(express.json())

app.get("/api/estates-to-sell",getAllEstates)

export default app;