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
const express_1 = require("express");
const FetchService_1 = __importDefault(require("../services/FetchService"));
const stockRouter = (0, express_1.Router)();
const stockUrl = "https://stocks.heat-engineer.dev/api/stocks/heat-engineer/current";
stockRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, FetchService_1.default)(stockUrl);
    if (response.status == 200) {
        res.send(response.data);
    }
    else {
        res.send("Internal Server Error");
    }
}));
stockRouter.post("/stock/:price/time/:timestamp/key/:symbol", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const stock = ((_a = req.params.price) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        const time = req.params.timestamp;
        const key = req.params.symbol;
        console.log({ stock, time, key });
        // const emit = await Producer(kafka, stock);
        // if(emit){
        //     res.send({message: "Test", status: 200});
        // } else {
        //     throw new Error("Internal server error");
        // }
    }
    catch (error) {
        throw new Error("Failed to emit to data stream");
    }
}));
exports.default = stockRouter;
