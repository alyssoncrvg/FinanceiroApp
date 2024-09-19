export interface Item {
    id: string;
    banco: string;
    valor: number;
    [key: string]: string | number; // Permite indexar com string
}