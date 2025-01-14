'use client';
import { createContext, ReactElement, useEffect, useState } from "react";
import HeatEngineerStockModel from "../models/stockModel";
import useWebsocket from "../hooks/useWebsocket";

const StockContext = createContext<HeatEngineerStockModel | null>(null);

const DataContext: React.FC<{children: ReactElement}> = ({children}) => {
    const [data, setData] = useState<HeatEngineerStockModel | null>(null);
    useWebsocket(setData);
    useEffect(() => {
        if(data){
            console.log(`Update to data - ${data}`);
        }
    }, [data])
    
    return (
        <StockContext.Provider value={data}>
            {children}
        </StockContext.Provider>
    )
}

export { StockContext, DataContext};