import express, { Request, Response } from "express";

const app = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
    res.sendStatus(200);
})

export default app;