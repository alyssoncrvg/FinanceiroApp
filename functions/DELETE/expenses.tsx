import { Alert } from "react-native";
import { apiRequest } from "../../api/api";
import { expenses } from "../../interfaces/interfaces";


export const deleteExpense = async (expense: expenses) => {

    const { _id } = expense

    try{

        const response = await apiRequest(`/gastos/${_id}`, 'DELETE')

        return response;

    } catch(error){
        Alert.alert('Erro ao deletar dispesa')
    }

}