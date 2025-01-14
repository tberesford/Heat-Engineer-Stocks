

const CalculateShares = (numberOfShares: number, price: number): number => {
    return numberOfShares * price;
}

const StockCalculator = (ownedShares: number, currPrice: number, shares: number, method: string) => {
    if(method.toLowerCase() === "sell"){
        const afterSaleShares = ownedShares - Math.abs(shares);
        if(afterSaleShares < 0){
            return "You do not own enough shares"
        }
        const saleValue = CalculateShares(shares, currPrice);
        return [afterSaleShares, saleValue];
    }
}

export default StockCalculator;