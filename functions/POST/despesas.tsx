import { Alert } from "react-native";
import { apiRequest } from "../../api/api";

export const addExpenses = async (descricao: string, valor: number, categoria: string) => {
    try {

        if(descricao=='' && !isNaN(valor) && categoria==''){
            console.log('valores errados')
            Alert.alert('Valores inseridos de forma incorreta!!!')
            return;
        }

        const response = await apiRequest('/gastos', 'POST', {
            descricao,
            valor,
            categoria
        })

        console.log('Despesa adicionada:', response);
        return response;
    } catch(error){
        console.log(error)
    }
}