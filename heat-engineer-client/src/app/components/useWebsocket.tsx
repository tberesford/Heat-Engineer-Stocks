'use client';
import { useEffect, Dispatch, SetStateAction } from "react";
import HeatEngineerStockModel from "../models/stockModel";
import FormatData from "../services/FormatData";

const useWebsocket = (setContextData: Dispatch<SetStateAction<HeatEngineerStockModel | null>>) => {
    const wsUrl = "ws://localhost:8080/";
    useEffect(() => {
        const ws = new WebSocket(wsUrl);
        ws.onopen = () => {
            console.log("WebSocket connection opened.");
        };

        ws.onmessage = (event) => {
            const result = FormatData<HeatEngineerStockModel>(JSON.parse(event.data));
            setContextData(result);
        }
    }, [setContextData]);
}

export default useWebsocket;