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
const KafkaService_1 = require("../services/KafkaService");
const axios_1 = __importDefault(require("axios"));
const ValidateData_1 = __importDefault(require("../services/ValidateData"));
class StockController {
    constructor() {
        this.url = "http://localhost:3001/api/stock/current";
        this.kafka = (0, KafkaService_1.Broker)();
        this.producer = (0, KafkaService_1.StockProducer)(this.kafka);
    }
    onInterval() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.connect();
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                const stockResponse = yield axios_1.default.get(this.url);
                const stockData = (0, ValidateData_1.default)(stockResponse.data);
                this.producer.send({
                    topic: "first_topic",
                    messages: [{ value: JSON.stringify(stockData) }]
                });
            }), 5000);
        });
    }
    onDisconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.disconnect();
        });
    }
}
exports.default = StockController;
