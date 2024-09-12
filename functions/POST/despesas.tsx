import { apiRequest } from "../../api/api";

export const addExpenses = async (descricao: string, valor: number, categoria: string) => {
    try {
        const response = await apiRequest('/gastos', 'POST', {
            descricao,
            valor,
            categoria
        })

        console.log('Carteira adicionada:', response);
        return response;
    } catch(error){
        console.log(error)
    }
}