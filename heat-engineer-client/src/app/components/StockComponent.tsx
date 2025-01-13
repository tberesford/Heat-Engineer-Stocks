'use client';
import { useContext } from "react";
import { StockContext } from "../services/DataContext";

const StockComponent: React.FC = () => {
    const context = useContext(StockContext);

    if(!context){
        return (
            <>
                <p>Latest Websocket Stock Price!</p>
                <p>Loading...</p>
            </>
        )
    } else {
        return (
            <>
                <p>Latest Websocket Stock Price!</p>
                <p>{context.price.toString()}</p>
            </>
        )
    }
}

export default StockComponent;
