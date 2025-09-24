import { createContext, useState } from "react";

// export const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
    const [rate, setRate] = useState(0); // tasa de USD → Bs

    const updateRate = (newRate) => {
        setRate(parseFloat(newRate));
    };

    return (
        <CurrencyContext.Provider value={{ rate, updateRate }}>
            {children}
        </CurrencyContext.Provider>
    );
}
