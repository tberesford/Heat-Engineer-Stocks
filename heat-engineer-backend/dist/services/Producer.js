"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = exports.Producer = exports.Broker = void 0;
const kafkajs_1 = require("kafkajs");
const Broker = () => {
    const kafka = new kafkajs_1.Kafka({
        clientId: "heat-stock-app",
        brokers: ["localhost:9092"]
    });
    return kafka;
};
exports.Broker = Broker;
const Producer = (kafka) => __awaiter(void 0, void 0, void 0, function* () {
    // Producer to emit messages to broker
    const producer = kafka.producer();
    yield producer.connect();
    yield producer.send({
        topic: "first_topic",
        messages: [
            { key: "test", value: "Hello world!" }
        ]
    });
});
exports.Producer = Producer;
const Consumer = (kafka) => __awaiter(void 0, void 0, void 0, function* () {
    // Consumes messages
    const consumer = kafka.consumer({ groupId: "test-group" });
    yield consumer.connect();
    yield consumer.subscribe({ topic: "first_topic", fromBeginning: true });
    yield consumer.run({
        eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message, heartbeat, pause }) {
            var _b, _c;
            console.log({
                key: (_b = message.key) === null || _b === void 0 ? void 0 : _b.toString(),
                value: (_c = message.value) === null || _c === void 0 ? void 0 : _c.toString(),
                headers: message.headers,
            });
        }),
    });
});
exports.Consumer = Consumer;
