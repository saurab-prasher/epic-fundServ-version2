import React, { createContext, useState } from "react";

export const FundContext = createContext();

export const FundProvider = ({ children }) => {
  const [funds, setFunds] = useState([]);

  // Add logic to manipulate funds here

  return (
    <FundContext.Provider value={{ funds, setFunds }}>
      {children}
    </FundContext.Provider>
  );
};
