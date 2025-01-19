import { Kafka, Producer } from "kafkajs";
import { Broker, StockProducer } from "../services/KafkaService";
import ValidateStockData from "../services/ValidateData";
import Fetch from "../services/FetchService";

class StockController {
    private kafka: Kafka;
    private producer: Producer;
    private readonly url = "http://localhost:3001/api/stock/current";

    constructor () {
        this.kafka = Broker();
        this.producer = StockProducer(this.kafka);
    }

    async onInterval(){
        await this.producer.connect();        
        setInterval(async () => {
            try{
                const stockResponse = await Fetch(this.url);
                const stockData = ValidateStockData(stockResponse);
                console.log(stockData);
            } catch (error){
                throw new Error("Internal server error");
            }
        }, 5000);
    }

    async onDisconnect(){
        await this.producer.disconnect();
    }
}

export default StockController;