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

export default stockRouter;