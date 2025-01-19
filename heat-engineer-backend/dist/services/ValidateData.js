"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const StockDataSchema = zod_1.z.object({
    symbol: zod_1.z.string(),
    price: zod_1.z.number(),
    timestamp: zod_1.z.number()
});
function ValidateStockData(data) {
    try {
        return StockDataSchema.parse(data);
    }
    catch (error) {
        throw new Error("Data not in correct format");
    }
}
exports.default = ValidateStockData;
