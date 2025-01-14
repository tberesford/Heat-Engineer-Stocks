import ButtonComponent from "../components/Button";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/dom';
import { StockCalculator, ValidateTransaction} from "../services/CalculateShares";

interface ISale {
    ownedShares: number,
    sharePrice: number,
    method: string,
    shares: number,
    balance: number
}

describe("Test User Portfolio", () => {
    let mockSaleData: ISale;
    let mockPurchaseData: ISale;
    let mockErrorShareData: ISale;
    let mockErrorPurchaseData: ISale;
    beforeAll(() => {
        mockSaleData = { ownedShares: 0, sharePrice: 5, method: "Sell", shares: -2, balance: 100 };
        mockPurchaseData = { ownedShares: 0, sharePrice: 50, method: "Buy", shares: 2, balance: 100 };
        mockErrorShareData = { ownedShares: 0, sharePrice: 0, method: "Buy", shares: 2, balance: 100 };
        mockErrorPurchaseData = { ownedShares: 0, sharePrice: 90, method: "Buy", shares: 2, balance: 100 };
    })

    test("button click event", () => {
        const buttonType = "Buy";
        const mockHandler = jest.fn();

        render(<ButtonComponent onClick={mockHandler} method={buttonType}/>);
        fireEvent.click(screen.getByText(buttonType));
        expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    test("buying shares decreases account balance", () => {
        const result: ISaleResponse = StockCalculator(mockPurchaseData); //(mockPurchaseData.ownedShares, mockPurchaseData.sharePrice, mockPurchaseData.shares, mockPurchaseData.method, mockPurchaseData.balance);
        expect(result.balance).toBeLessThan(mockPurchaseData.balance);
    })

    test("buying shares increases number of owned shares", () => {
        const result = StockCalculator(mockPurchaseData);//(mockPurchaseData.ownedShares, mockPurchaseData.sharePrice, mockPurchaseData.shares, mockPurchaseData.method, mockPurchaseData.balance);
        expect(result.shares).toBeGreaterThan(mockPurchaseData.ownedShares);
    });
    
    test("shares are bought at the correct price", () => {
        const result = StockCalculator(mockPurchaseData);//(mockPurchaseData.ownedShares, mockPurchaseData.sharePrice, mockPurchaseData.shares, mockPurchaseData.method, mockPurchaseData.balance);
        expect(result.value).toEqual(100);
        expect(result.balance).toEqual(0);
    });


    test("cannot buy if you do not have enough money", () => {
        const result = ValidateTransaction(mockErrorPurchaseData);//(mockErrorPurchaseData.ownedShares, mockErrorPurchaseData.sharePrice, mockErrorPurchaseData.shares, mockErrorPurchaseData.method, mockErrorPurchaseData.balance);
        expect(result).toEqual("Error purchasing shares - not enough funds");
    });
    test("cannot buy if no share price", () => {
        const result = ValidateTransaction(mockErrorShareData);//(mockErrorShareData.ownedShares, mockErrorShareData.sharePrice, mockErrorShareData.shares, mockErrorShareData.method, mockErrorShareData.balance);
        expect(result).toEqual("Error purchasing shares - try again later");
    });
    test("cannot sell shares when owned is zero", () => {
        const result = ValidateTransaction(mockSaleData);//(mockSaleData.ownedShares, mockSaleData.sharePrice, mockSaleData.shares, mockSaleData.method, mockSaleData.balance);
        expect(result).toEqual("You do not own enough shares"); 
    });
})