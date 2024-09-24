import { Alert } from "react-native";
import { apiRequest } from "../../api/api";
import { walletFormat } from "../../interfaces/interfaces";

export const editWallet = async (item: walletFormat) => {
    try{
        const response = await apiRequest(`/carteiras/${item.id}`, 'PATCH', {
            "novoBanco" : item.banco,
            "saldo": item.valor
        })

        return response

    } catch(error){
        Alert.alert('Erro ao editar a carteira')
    }
}