import RoundNumber from "./RoundValue";

const CalculateShares = (numberOfShares: number, sharePrice: number): number => {
    // Calculate amount of shares bought in value
    return RoundNumber(numberOfShares * sharePrice);
}

const UpdateBalance = (saleValue: number, currBalance: number, method: string): number => {
    // Update the current balance
    if(method === "sell"){
        return RoundNumber(currBalance + saleValue);
    } else if (method === "buy"){
        return RoundNumber(currBalance - saleValue);
    } else {
        throw new Error("Not a valid sale function");
    }
}

const StockCalculator = (saleData: ISale): ISaleResponse => {
    // Calculates all new values based on saleData
    const method = saleData.method.toLowerCase();
    let transactionValue = CalculateShares(saleData.shares, saleData.sharePrice);
    const updatedBalance = UpdateBalance(transactionValue, saleData.balance, method);

    let afterSaleShares = 0;
    let newPosition = saleData.position;
    if(method === "sell"){
        afterSaleShares = saleData.ownedShares - saleData.shares;
        transactionValue = -transactionValue;
    } else if(method === "buy"){
        afterSaleShares = saleData.ownedShares + saleData.shares;
    }
    newPosition += transactionValue;
    return {shares: afterSaleShares, value: transactionValue, balance: updatedBalance, position: newPosition};
}

const ValidateTransaction = (transactionData: ISale): ISaleResponse | string => {
    // Determines response based on current user Portfolio
    try{
        let message;
        if(transactionData.method.toLowerCase() === "sell" && (transactionData.shares > transactionData.ownedShares || transactionData.ownedShares <= 0)){
            message = "You do not own enough shares";
        }
        if(transactionData.sharePrice <= 0){
            message = "Error purchasing shares - try again later";
        }
        if((transactionData.sharePrice * transactionData.shares > transactionData.balance) && transactionData.method.toLowerCase() === "buy"){
            message = "Error purchasing shares - not enough funds";
        }

        const transactionResult: ISaleResponse = StockCalculator(transactionData);
        return message ? message : transactionResult;
    } catch (error) {
        throw new Error("Something went wrong with transaction");
    }
}

export {StockCalculator, ValidateTransaction};