import { Alert } from "react-native";
import { apiRequest } from "../../api/api";
import { Item } from "../../interfaces/interfaces";


export const deleteWallet = async (item: Item) => {
    try{
        const response = await apiRequest(`/carteiras/${item.id}`, 'DELETE');

        return response;
        
    } catch (error){
        Alert.alert('Erro ao deletar carteira')
    }
}