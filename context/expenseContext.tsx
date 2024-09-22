import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ExpenseContextType {
  expenseAdded: boolean;
  setExpenseAdded: React.Dispatch<React.SetStateAction<boolean>>;
  itemUpdated: boolean; // Novo estado para carteira
  setItemUpdated: React.Dispatch<React.SetStateAction<boolean>>; // Setter para carteira
  sumWallet: number;
  setSumWallet:  React.Dispatch<React.SetStateAction<number>>;
}

// Inicialize o contexto com um valor padrão vazio
const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

interface ExpenseProviderProps {
  children: ReactNode;
}

// Provider para despesas
export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenseAdded, setExpenseAdded] = useState(false);
  const [itemUpdated, setItemUpdated] = useState(false); // Novo estado de carteira
  const [sumWallet, setSumWallet] = useState(0);

  return (
    <ExpenseContext.Provider value={{ expenseAdded, setExpenseAdded, itemUpdated, setItemUpdated, sumWallet, setSumWallet }}>
      {children}
    </ExpenseContext.Provider>
  );
}

// Hook para usar o contexto de despesas
export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}
