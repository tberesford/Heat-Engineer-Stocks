'use client';
import { useEffect, Dispatch, SetStateAction } from "react";
import HeatEngineerStockModel from "../models/stockModel";
import FormatData from "../services/FormatData";

const useWebsocket = (setContextData: Dispatch<SetStateAction<HeatEngineerStockModel | null>>) => {
    const wsUrl = "ws://localhost:8080/";
    useEffect(() => {
        const ws = new WebSocket(wsUrl);
        // Open websocket connection to backend server
        ws.onopen = () => {
            console.log("WebSocket connection opened.");
        };

        // On a new message, parse data and set as context
        ws.onmessage = (event) => {
            const result = FormatData<HeatEngineerStockModel>(JSON.parse(event.data));
            setContextData(result);
        }

        // Log any errors
        ws.onerror = (error) => {
            console.log("Error at websocket " + error);
        }

        // Close websocket to prevent memory leaks
        ws.onclose = () => {
            console.log("WebSocket closed");
            ws.close();
        }
    }, [setContextData]);
}

export default useWebsocket;