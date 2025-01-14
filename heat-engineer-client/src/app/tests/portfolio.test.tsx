import ButtonComponent from "../components/Button";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/dom';
import StockCalculator from "../services/CalculateShares";

interface ISale {
    ownedShares: number,
    sharePrice: number,
    method: string,
    shares: number
}

describe("Test User Portfolio", () => {
    let mockSaleData: ISale;
    let mockPurchaseData: ISale;
    let mockErrorData: ISale;
    beforeAll(() => {
        mockSaleData = { ownedShares: 0, sharePrice: 5, method: "Sell", shares: -2 };
        mockPurchaseData = { ownedShares: 0, sharePrice: 5, method: "Buy", shares: 2 };
        mockErrorData = { ownedShares: 0, sharePrice: 0, method: "Buy", shares: 2 };
    })

    test("button click event", () => {
        const buttonType = "Buy";
        const mockHandler = jest.fn();

        render(<ButtonComponent onClick={mockHandler} method={buttonType}/>);
        fireEvent.click(screen.getByText(buttonType));
        expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    test("cannot sell shares when owned is zero", () => {
        const result = StockCalculator(mockSaleData.ownedShares, mockSaleData.sharePrice, mockSaleData.shares, mockSaleData.method);
        expect(result).toEqual("You do not own enough shares"); 
    });

    test("buying shares increases number of owned shares", () => {
        const result = StockCalculator(mockPurchaseData.ownedShares, mockPurchaseData.sharePrice, mockPurchaseData.shares, mockPurchaseData.method);
        expect(result![0]).toBeGreaterThan(mockPurchaseData.ownedShares);
    });
    test("cannot buy if no share price", () => {
        const result = StockCalculator(mockErrorData.ownedShares, mockErrorData.sharePrice, mockErrorData.shares, mockErrorData.method);
        expect(result).toEqual("Error purchasing shares - try again later");
    });
    test("shares are bought at the correct price", () => {
        const result = StockCalculator(mockPurchaseData.ownedShares, mockPurchaseData.sharePrice, mockPurchaseData.shares, mockPurchaseData.method);
        expect(result).toEqual([2, 10]);
    });
})