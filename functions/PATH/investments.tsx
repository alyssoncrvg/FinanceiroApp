import { Alert } from "react-native";
import { apiRequest } from "../../api/api";
import { FormDataInvestments } from "../../interfaces/interfaces";


export const editInvestment = async (investment: FormDataInvestments) => {
    const { _id } = investment

    try{

        const response = await apiRequest(`/investimentos/${_id}`, 'PATCH', {
            'novaBolsa' : investment.bolsa,
            'valor': investment.valor
        })

        return response

    } catch(error){
        Alert.alert('Erro ao editar investimento')
    }
}