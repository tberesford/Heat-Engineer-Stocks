'use client';
import { useEffect, useState, useContext } from "react";
import Card from "./Card";
import StockComponent from "./StockComponent";
import ButtonComponent from "./Button";

const Portfolio: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [userShares, setNumberOfShares] = useState(0);
    const [buySell, setBuySell] = useState(0);

    useEffect(() => {
        
        // Reset the state to inactive
        setBuySell(0);
    }, [buySell])

    const buyHandler = () => {
        setBuySell(1);
    }
    const sellHandler = () => {
        setBuySell(-1);
    }

    return (
        <>
            <div>
                <Card>
                    <StockComponent/>
                </Card>
            </div>
            <div className="grid grid-rows-1 grid-cols-2 gap-16">
                <Card>
                    <ButtonComponent method="Buy" onClick={buyHandler}/>
                </Card>
                <Card>
                    <ButtonComponent method="Sell" onClick={sellHandler}/>                
                </Card>
            </div>
            
            <Card>
                <div>
                    <p>{userShares}</p>
                    {/* <p>{userPortfolio}</p> */}
                </div>
            </Card>
        </>
    )
}

export default Portfolio;