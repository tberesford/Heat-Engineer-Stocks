"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ValidateStockData(data) {
    try {
        return data;
    }
    catch (error) {
        throw new Error("Data not in correct format");
    }
}
exports.default = ValidateStockData;
