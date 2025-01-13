import express from "express";
import stockRouter from "./api/stock";

const app = express();

app.use(express.json());
app.use("/api/stock/current", stockRouter);

export default app;