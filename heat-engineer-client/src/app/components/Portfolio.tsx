'use client';
import { useState, useContext, useEffect } from "react";
import Card from "./Card";
import StockComponent from "./StockComponent";
import ButtonComponent from "./Button";
import RoundNumber from "../services/RoundValue";
import { ValidateTransaction } from "../services/CalculateShares";
import { StockContext } from "../services/DataContext";

const Portfolio: React.FC = () => {
    const context = useContext(StockContext);
    const [error, setError] = useState<string | null>(null);
    const [sharesToTransact, setShares] = useState(1);
    const [userPortfolio, setNumberOfShares] = useState(0);
    const [userInvestments, setuserInvestments] = useState(0);
    const [userBalance, setUserBalance] = useState(1000);
    const [userTotal, setUserTotal] = useState(userBalance);

    useEffect(() => {
        if (context) {
            setuserInvestments(RoundNumber(userPortfolio * context.price));
        }
    }, [context, userPortfolio]);

    useEffect(() => {
        if(context){
            setUserTotal(RoundNumber(userBalance + userInvestments));
        }
    }, [userInvestments]);

    const inputHandler = (event) => {
        setShares(Number.parseInt(event.target.value));
    }

    const updateUserPortfolio = (method: "Buy" | "Sell") => {
        if(!context){
            setError("Error purchasing shares - try again later");
        } else if(sharesToTransact < 1){
            setError("Error purchasing shares - please ensure positive number is used");
        } else {
            try{
                console.log(sharesToTransact);
                const saleData: ISale = { sharePrice: context.price, balance: userBalance, ownedShares: userPortfolio, shares: sharesToTransact, method: method }
                const updatedValues = ValidateTransaction(saleData);
                if(typeof(updatedValues) === 'string'){
                    setError(updatedValues);
                } else {
                    setNumberOfShares(updatedValues.shares);
                    setUserBalance(updatedValues.balance);
                    setError(null);
                }
            } catch (error) {
                setError("Something went wrong...");
            }
        }
    }

    return (
        <div className="grid grid-rows-3 gap-4 text-center text-lg">
            <Card>
                <StockComponent/>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 items-center">
                {/* Callback function passed to onClick to update portfolio on click */}
                <ButtonComponent method="Buy" onClick={() => updateUserPortfolio("Buy")}/>
                <Card>
                    <div className="grid grid-rows-2 gap-4">
                        <p>Shares</p>
                        <input defaultValue={1} placeholder="1" type="number" onChange={inputHandler}/>
                    </div>
                </Card>
                <ButtonComponent method="Sell" onClick={() => updateUserPortfolio("Sell")}/>
            </div>
            
            <Card>
                <div className="grid grid-rows-3 gap-4 text-center">
                    <div className="grid grid-cols-1">
                        <p>Stock Portfolio</p>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        <p>Shares</p>
                        <p>Invested</p>
                        <p>Available Cash</p>
                        <p>Total</p>
                    </div>
                    <div className="grid grid-cols-4 gap-6 text-center">
                        <p>{userPortfolio}</p>
                        <p>{userInvestments}</p>
                        <p>{userBalance}</p>
                        <p>{userTotal}</p>
                    </div>
                </div>
            </Card>

            {error ? <Card><div className="text-center text-red-500 font-medium">{error}</div></Card> : null}
        </div>
    )
}

export default Portfolio;