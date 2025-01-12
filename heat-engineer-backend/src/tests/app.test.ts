import axios from "axios";
import HeatEngineerStockModel from "../models/stockModel";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Get /heat-stock", () => {
    let mockData: HeatEngineerStockModel;
    beforeAll(() => {
        mockData = {timestamp: 0, price: 0, symbol: "HEAT"};
    })

    test("Get a 200 response", async () => {
        mockedAxios.get.mockResolvedValueOnce({data: mockData, status: 200});
        const response = await axios.get("/api/stock/current");
        expect(response.status).toBe(200);
    });

    test("Get response in Heat Engineer stock format", async () => {
        mockedAxios.get.mockResolvedValueOnce({data: mockData, status: 200});
        const response = await axios.get("/api/stock/current");
        expect(response.data).toEqual(mockData);
    });

    
})