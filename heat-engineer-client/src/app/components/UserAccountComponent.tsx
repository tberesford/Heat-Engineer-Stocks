import { useState, useEffect, SetStateAction, Dispatch, useContext } from "react";
import { StockContext } from "../services/DataContext";

const UserAccount: React.FC = () => {
    const context = useContext(StockContext);
    const [userShares, setNumberOfShares] = useState(0);
    const [userPortfolio, setPortfolio] = useState(0);

    useEffect(() => {
        if(context){
            setNumberOfShares(userShares + 1);
            setPortfolio(userPortfolio + (1 * context?.price));
        }
    }, [context])

    return (
        <>
            <p>Portfolio</p>
            <p>Number of shares owned: {userShares}</p>
            <p>Share valuation: {userPortfolio}</p>
        </>
    )
}

export default UserAccount;