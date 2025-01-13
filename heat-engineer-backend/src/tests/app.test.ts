import axios from "axios";
import HeatEngineerStockModel from "../models/stockModel";
import { Consumer, Kafka, Partitioners, Producer } from "kafkajs";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Get /heat-stock", () => {
    let mockData: HeatEngineerStockModel;
    beforeAll(() => {
        mockData = {timestamp: 0, price: 0, symbol: "HEAT"};
    })

    test("Get a 200 response", async () => {
        mockedAxios.get.mockResolvedValueOnce({data: mockData, status: 200});
        const response = await axios.get("/api/stock/current");
        expect(response.status).toBe(200);
    });

    test("Get response in Heat Engineer stock format", async () => {
        mockedAxios.get.mockResolvedValueOnce({data: mockData, status: 200});
        const response = await axios.get("/api/stock/current");
        expect(response.data).toEqual(mockData);
    });
})

describe("Setup Kafka", () => {
    let consumer: Consumer;
    let producer: Producer;
    const kafka = new Kafka({
        clientId: 'heat-stock-app',
        brokers: ['localhost:9092']
    });

    beforeAll(async () => {
        consumer = kafka.consumer({groupId: "test-group"});
        producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner});
        
        await consumer.connect();
        await consumer.subscribe({topic: "first_topic"});

        await producer.connect();
    });

    afterAll(async () => {
        await consumer.disconnect();
        await producer.disconnect();
    })

    test("Connect to Kafka Broker", () => {
        expect(kafka).toBeInstanceOf(Kafka);
    });

    test("Emitting to topic", async () => {
        const message = "Hello kafka!";
        const receivedMessages: string[] = [];

        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
                const receivedMessage = message.value?.toString(); 
                receivedMessages.push(receivedMessage!);
            }
        });

        await producer.send({
            topic: "first_topic",
            messages: [{value: message}]
        });

        await new Promise((resolve) => { setTimeout(resolve, 3000)});

        expect(receivedMessages).toContain(message);
    });
})