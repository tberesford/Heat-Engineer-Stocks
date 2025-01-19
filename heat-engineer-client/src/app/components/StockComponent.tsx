'use client';
import { useContext } from "react";
import { StockContext } from "../services/DataContext";

const StockComponent: React.FC = () => {
    const context = useContext(StockContext);

    if(!context){
        return (
            <div className="grid mt-6">
                <div className="text-xl">Latest Stock Price!</div>
                <div className="text-lg">Loading...</div>
            </div>
        )
    } else {
        return (
            <div className="grid mt-6">
                <div className="text-xl">Latest Stock Price!</div>
                <div className="text-lg">£{context.price.toString()}</div>
            </div>
        )
    }
}

export default StockComponent;
