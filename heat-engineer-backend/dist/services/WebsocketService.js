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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const KafkaService_1 = require("./KafkaService");
class WebService {
    constructor() {
        this.kafka = (0, KafkaService_1.Broker)();
        this.consumer = (0, KafkaService_1.StockConsumer)(this.kafka);
        this.webSocket = new ws_1.default.Server({ port: 8080 });
    }
    onConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.connect();
            this.webSocket.on("connection", (wss) => {
                console.log("Websocket connected");
                this.consumer.run({
                    eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, message, partition }) {
                        var _b;
                        const stockUpdate = ((_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()) || "";
                        const stockTime = message.timestamp;
                        wss.send(stockUpdate);
                    })
                });
            });
        });
    }
}
exports.default = WebService;
