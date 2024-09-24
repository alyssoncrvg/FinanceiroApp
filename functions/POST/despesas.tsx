import { Alert } from "react-native";
import { apiRequest } from "../../api/api";

export const addExpenses = async (descricao: string, valor: number, categoria: string) => {
    try {

        if(descricao=='' && !isNaN(valor) && categoria==''){
            Alert.alert('Valores inseridos de forma incorreta!!!')
            return;
        }

        const response = await apiRequest('/gastos', 'POST', {
            descricao,
            valor,
            categoria
        })
        return response;
    } catch(error){
        Alert.alert('Erro ao adicionar despesa')
    }
}