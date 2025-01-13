import { Router, Request, Response } from 'express';
import Fetch from '../services/FetchService';


const stockRouter = Router();
const stockUrl = "https://stocks.heat-engineer.dev/api/stocks/heat-engineer/current";

stockRouter.get("/", async (req: Request, res: Response) => {
    const response = await Fetch(stockUrl);
    if(response.status == 200){
        res.send(response.data);
    } else {
        res.send("Internal Server Error");
    }
});

stockRouter.post("/stock/:price/time/:timestamp/key/:symbol", async (req: Request, res: Response) => {
    try{
        const stock = req.params.price?.toString() || "";
        const time = req.params.timestamp;
        const key = req.params.symbol;
    } catch (error) {
        throw new Error("Failed to emit to data stream");
    }
})

export default stockRouter;