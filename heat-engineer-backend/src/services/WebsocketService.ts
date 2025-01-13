import { Consumer, Kafka } from "kafkajs";
import WebSocket from "ws";
import { Broker, StockConsumer } from "./KafkaService";

class WebService {
    private webSocket: WebSocket.Server;
    private consumer: Consumer;
    private kafka: Kafka;

    constructor(){
        this.kafka = Broker();
        this.consumer = StockConsumer(this.kafka);
        this.webSocket = new WebSocket.Server({port: 8080});
    }

    async onConnection() {
        await this.consumer.connect();
        this.webSocket.on("connection", (wss) => {
            console.log("Websocket connected");
            this.consumer.run({
                eachMessage: async ({topic, message, partition}) => {
                    const stockUpdate = message.value?.toString() || "";
                    const stockTime = message.timestamp;
                    wss.send(stockUpdate); 
                }
            })
        })
    }
}

export default WebService;