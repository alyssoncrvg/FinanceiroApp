import React, { createContext, useState, useContext, ReactNode } from 'react';

// Defina o tipo para o contexto de investimentos
interface InvestmentContextType {
  sumInvestments: number;
  setSumInvestments: React.Dispatch<React.SetStateAction<number>>;
}

// Inicialize o contexto com um valor padrão vazio
const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

interface InvestmentProviderProps {
  children: ReactNode;
}

// Provider para investimentos
export function InvestmentProvider({ children }: InvestmentProviderProps) {
  const [sumInvestments, setSumInvestments] = useState(0); // Estado compartilhado

  return (
    <InvestmentContext.Provider value={{ sumInvestments, setSumInvestments }}>
      {children}
    </InvestmentContext.Provider>
  );
}

// Hook para usar o contexto de investimentos
export function useInvestments() {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestments must be used within an InvestmentProvider');
  }
  return context;
}
