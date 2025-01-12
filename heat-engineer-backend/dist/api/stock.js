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
stockRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stockUrl = "https://stocks.heat-engineer.dev/api/stocks/heat-engineer/current";
    const response = yield (0, FetchService_1.default)(stockUrl);
    if (response.status == 200) {
        res.send(response.data);
    }
    else {
        res.send("Internal Server Error");
    }
}));
exports.default = stockRouter;
