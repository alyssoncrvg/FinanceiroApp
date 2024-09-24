import { Alert } from "react-native";
import { apiRequest } from "../../api/api";
import { FormDataInvestments } from "../../interfaces/interfaces";


export const addInvestments = async (formData: FormDataInvestments) => {

    const bolsa = formData.bolsa;
    const valor = formData.valor
    try{
        const response = await apiRequest('/investimentos', 'POST', {
            bolsa,
            valor,
        })

        return response

    } catch (error){
        Alert.alert('Erro ao adicionar investimento')
    }

}