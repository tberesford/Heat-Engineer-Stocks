import { Kafka, Producer } from "kafkajs";
import { Broker, StockProducer } from "../services/KafkaService";
import axios from "axios";
import ValidateStockData from "../services/ValidateData";
import HeatEngineerStockModel from "../models/stockModel";

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
            const stockResponse = await axios.get(this.url);
            const stockData = ValidateStockData<HeatEngineerStockModel>(stockResponse.data);
            this.producer.send(
                {
                    topic: "first_topic",
                    messages: [{value: JSON.stringify(stockData)}]
                }
            );
        }, 5000);
    }

    async onDisconnect(){
        await this.producer.disconnect();
    }
}

export default StockController;