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
        
        this.webSocket.on("connection", (wss) => {
            wss.on("close", () => {
                console.log("Websocket closed");
            })
        })
        this.consumer.run({
            eachMessage: async ({topic, message, partition}) => {
                const stockUpdate = message.value?.toString() || "";
                const stockTime = message.timestamp;
                this.webSocket.clients.forEach((client) => {
                    client.send(stockUpdate);
                })
                 
            }
        })
        this.consumer.on("consumer.disconnect", () => {
            console.log("Consumer disconnected");
        })
        this.consumer.on("consumer.crash", () => {
            console.log("Consumer crashed");
        })
    }
}

export default WebService;