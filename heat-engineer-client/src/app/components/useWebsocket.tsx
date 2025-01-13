'use client';
import { useState, useEffect } from "react";
import HeatEngineerStockModel from "../models/stockModel";
import FormatData from "../services/FormatData";

const WebsocketComponent = () => {
    const wsUrl = "ws://localhost:8080/";
    // const [data, setData] = useState<HeatEngineerStockModel>();
    // const [error, setError] = useState(null);
    
    useEffect(() => {
        const ws = new WebSocket(wsUrl);
        ws.onmessage = (event) => {
            const result = FormatData<HeatEngineerStockModel>(event.data);
            // if(typeof(result) !== "string"){
            //     setData(result);
            // } else {
            //     setError(result);
            // }
        }
    }, []);
}

export default WebsocketComponent;