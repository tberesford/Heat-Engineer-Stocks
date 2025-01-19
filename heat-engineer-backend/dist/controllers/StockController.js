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
const ValidateData_1 = __importDefault(require("../services/ValidateData"));
const FetchService_1 = __importDefault(require("../services/FetchService"));
class StockController {
    constructor() {
        // private kafka: Kafka;
        // private producer: Producer;
        this.url = "http://localhost:3001/api/stock/current";
        // this.kafka = Broker();
        // this.producer = StockProducer(this.kafka);
    }
    onInterval() {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.producer.connect();        
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const stockResponse = yield (0, FetchService_1.default)(this.url); //axios.get(this.url);
                    const stockData = (0, ValidateData_1.default)(stockResponse); //ValidateStockData<HeatEngineerStockModel>(stockResponse);
                    console.log(stockData);
                }
                catch (error) {
                    throw new Error("Internal server error");
                }
            }), 5000);
        });
    }
}
exports.default = StockController;
