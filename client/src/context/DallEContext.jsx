import React, { createContext, useContext, useState } from 'react';

const DallEContext = createContext();

export function DallEProvider({ children }) {
    const [dallEResponses, setDallEResponses] = useState([]);

    const addDallEResponse = (caption, photo) => {
        setDallEResponses(prevResponses => [...prevResponses, { caption, photo }]);
    };

    return (
        <DallEContext.Provider value={{ dallEResponses, addDallEResponse }}>
            {children}
        </DallEContext.Provider>
    );
}

export function useDallE() {
    return useContext(DallEContext);
}
