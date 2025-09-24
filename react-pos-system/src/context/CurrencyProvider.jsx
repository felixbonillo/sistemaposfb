import { useState, useCallback } from "react";
import { CurrencyContext } from "./CurrencyContext";

export function CurrencyProvider({ children }) {
    const [rate, setRate] = useState(null);

    const updateRate = useCallback((newRate) => {
        setRate(newRate);
    }, []);

    return (
        <CurrencyContext.Provider value={{ rate, updateRate }}>
            {children}
        </CurrencyContext.Provider>
    );
}
