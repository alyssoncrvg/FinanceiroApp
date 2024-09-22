import { WithSafeAreaInsetsProps } from "react-native-safe-area-context";

export interface Item {
    id: string;
    banco: string;
    valor: number;
    [key: string]: string | number; // Permite indexar com string
}

export interface FlexModalProps {
    modalVisible: boolean;
    onClose: () => void;
    fields: { name: string; placeholder: string; type?: string }[]; // Lista de campos dinâmicos
    onSubmit: (formData: { [key: string]: string | number }) => void; // Função de submissão
    setAddItem: React.Dispatch<React.SetStateAction<boolean>>
  }

export interface FormDataGoal {
    id: string;
    categoria: string;
    titulo: string;
    targetAmount: number;
    currentAmount: number;
    forecast: Date; // formato de data em string ou Date
}

// types.ts
export type RootStackParamList = {
    Home: undefined;
    Investments: undefined;
    Control: undefined;
    Goals: undefined;
  };

export interface FormDataInvestments {
  _id:string;
  bolsa:string;
  valor: number;
  date: Date;
}

export interface expenses {
  _id: string,
  descricao: string,
  categoria: string,
  valor: number,
  date: Date,
}

export interface GroupedExpense {
  categoria: string;
  somaValue: number;
  gastos: expenses[];
}

export interface walletFormat{
  id: string,
  banco: string,
  valor: number,
}