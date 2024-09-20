import React, { createContext, useState, useContext, ReactNode } from 'react';

// Defina o tipo para o contexto de despesas
interface ExpenseContextType {
  expenseAdded: boolean;
  setExpenseAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

// Inicialize o contexto com um valor padrão vazio
const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

interface ExpenseProviderProps {
  children: ReactNode;
}

// Provider para despesas
export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenseAdded, setExpenseAdded] = useState(false);

  return (
    <ExpenseContext.Provider value={{ expenseAdded, setExpenseAdded }}>
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
