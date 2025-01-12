import app from "./app";
import StockController from "./controllers/StockController";

const port = 3001;
const stockControl = new StockController();

app.listen(port, async () => {
    await stockControl.onInterval();
    console.log(`Listening on port http:/localhost:${port}/. Controller has started`);
})