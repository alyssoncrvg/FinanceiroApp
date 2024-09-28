import React, { createContext, useState, useContext, ReactNode } from 'react';

interface InvestmentContextType {
  sumInvestments: number;
  setSumInvestments: React.Dispatch<React.SetStateAction<number>>;
}


const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

interface InvestmentProviderProps {
  children: ReactNode;
}


export function InvestmentProvider({ children }: InvestmentProviderProps) {
  const [sumInvestments, setSumInvestments] = useState(0);

  return (
    <InvestmentContext.Provider value={{ sumInvestments, setSumInvestments }}>
      {children}
    </InvestmentContext.Provider>
  );
}


export function useInvestments() {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestments must be used within an InvestmentProvider');
  }
  return context;
}
