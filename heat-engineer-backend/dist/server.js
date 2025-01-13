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
const app_1 = __importDefault(require("./app"));
const StockController_1 = __importDefault(require("./controllers/StockController"));
const WebsocketService_1 = __importDefault(require("./services/WebsocketService"));
const port = 3001;
const stockControl = new StockController_1.default();
const webService = new WebsocketService_1.default();
app_1.default.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield stockControl.onInterval();
    yield webService.onConnection();
    console.log(`Listening on port http:/localhost:${port}/. Controller has started`);
}));
