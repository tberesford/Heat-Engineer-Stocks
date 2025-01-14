

const CalculateShares = (numberOfShares: number, price: number): number => {
    return numberOfShares * price;
}

const UpdateBalance = (saleValue: number, currBalance: number, method: string): number => {
    if(method === "sell"){
        return currBalance + saleValue;
    } else if (method === "buy"){
        return currBalance - saleValue;
    } else {
        throw new Error("Not a valid sale function");
    }
}

const StockCalculator = (ownedShares: number, price: number, shares: number, method: string, balance: number) => {
    try{
        method = method.toLowerCase();
        if(price <= 0){
            return "Error purchasing shares - try again later";
        }

        if(method === "sell"){
            const afterSaleShares = ownedShares - Math.abs(shares);
            if(afterSaleShares < 0){
                return "You do not own enough shares";
            }
            const saleValue = CalculateShares(shares, price);
            const updatedBalance = UpdateBalance(saleValue, balance, method);
            return [afterSaleShares, saleValue, updatedBalance];

        } else if(method === "buy"){
            const afterSaleShares = ownedShares + shares;
            if(price * shares > balance){
                return "Error purchasing shares - not enough funds";
            }
            const purchaseValue = CalculateShares(shares, price);
            const updatedBalance = UpdateBalance(purchaseValue, balance, method);
            return [afterSaleShares, purchaseValue, updatedBalance]
        }
    } catch (error){
        return "Internal Server Error";
    }
}

export default StockCalculator;