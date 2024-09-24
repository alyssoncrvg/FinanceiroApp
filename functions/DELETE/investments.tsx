import { Alert } from "react-native";
import { apiRequest } from "../../api/api";
import { FormDataInvestments } from "../../interfaces/interfaces";


export const deleteInvestment = async (investment: FormDataInvestments) => {
    const { _id } = investment
    try{

        const response = await apiRequest(`/investments/${_id}`, 'DELETE')

        return response

    } catch(error) {
        Alert.alert('Erro ao deletar investimento')
    }
}