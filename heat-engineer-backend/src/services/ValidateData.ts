import { z } from 'zod';

const StockDataSchema = z.object({
    symbol: z.string(),
    price: z.number(),
    timestamp: z.number()
  });

function ValidateStockData (data: any) {
    try {
        return StockDataSchema.parse(data);
    } catch (error) {
        throw new Error("Data not in correct format");
    }
}

export default ValidateStockData;