import ButtonComponent from "../components/Button";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/dom';
import StockCalculator from "../services/CalculateShares";


describe("Test User Portfolio", () => {
    test("button click event", () => {
        const buttonType = "Buy";
        const mockHandler = jest.fn();

        render(<ButtonComponent onClick={mockHandler} method={buttonType}/>);
        fireEvent.click(screen.getByText(buttonType));
        expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    test("cannot sell shares when owned is zero", () => {
        const mockData = { ownedShares: 0, sharePrice: 5, method: "Sell", shares: -2 };
        const result = StockCalculator(mockData.ownedShares, mockData.sharePrice, mockData.shares, mockData.method);
        expect(result).toEqual("No shares to sell"); 
    });
    test.todo("buying shares increases number of owned shares");
    test.todo("cannot buy if no share price");
})