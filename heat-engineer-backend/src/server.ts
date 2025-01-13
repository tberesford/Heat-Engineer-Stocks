import app from "./app";
import StockController from "./controllers/StockController";
import WebService from "./services/WebsocketService";

const port = 3001;
const stockControl = new StockController();
const webService = new WebService();

app.listen(port, async () => {
    await stockControl.onInterval();
    await webService.onConnection();
    console.log(`Listening on port http:/localhost:${port}/. Controller has started`);
})