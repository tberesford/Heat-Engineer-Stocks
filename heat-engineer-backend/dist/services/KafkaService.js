"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockConsumer = exports.StockProducer = exports.Broker = void 0;
const kafkajs_1 = require("kafkajs");
const Broker = () => {
    const kafka = new kafkajs_1.Kafka({
        clientId: "heat-stock-app",
        brokers: ["localhost:9092"]
    });
    return kafka;
};
exports.Broker = Broker;
const StockProducer = (kafka) => {
    // Producer to emit messages to broker
    try {
        const producer = kafka.producer({ createPartitioner: kafkajs_1.Partitioners.LegacyPartitioner });
        return producer;
    }
    catch (error) {
        throw new Error("Could not connect to broker");
    }
};
exports.StockProducer = StockProducer;
const StockConsumer = (kafka) => {
    // Consumes messages
    const consumer = kafka.consumer({ groupId: "test-group" });
    return consumer;
    // await consumer.connect();
    // await consumer.subscribe( {topic: "first_topic", fromBeginning: true} );
    // return consumer;
    // await consumer.run({
    //     eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
    //         console.log({
    //             key: message.key?.toString(),
    //             value: message.value?.toString(),
    //             headers: message.headers,
    //         })
    //     },
    // })
};
exports.StockConsumer = StockConsumer;
