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
  }

export interface FormDataGoal {
    categoria: string;
    titulo: string;
    targetAmount: number;
    currentAmount: number;
    forecast: Date; // formato de data em string ou Date
}