import { Router, Request, Response } from 'express';
import HeatEngineerStockModel from '../models/stockModel';
import Fetch from '../services/FetchService';

const stockRouter = Router();

stockRouter.get("/", async (req: Request, res: Response) => {
    const stockUrl = "https://stocks.heat-engineer.dev/api/stocks/heat-engineer/current";

    const response = await Fetch(stockUrl);
    if(response.status == 200){
        res.send(response.data);
    } else {
        res.send("Internal Server Error");
    }
});

export default stockRouter;