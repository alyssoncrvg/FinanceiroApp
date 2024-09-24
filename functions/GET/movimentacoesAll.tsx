import { Alert } from "react-native"
import { apiRequest } from "../../api/api"


export const getMoviments = async () => {
    try{
        const response = await apiRequest(`/get/movimentacoes`, 'GET')
        return response
    } catch(error){
        Alert.alert('Erro ao pegar historico de movimentacoes')
    }
}