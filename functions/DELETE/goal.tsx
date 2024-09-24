import { Alert } from "react-native";
import { apiRequest } from "../../api/api";
import { FormDataGoal } from "../../interfaces/interfaces";


export const deleteGoal = async (item: FormDataGoal) => {
    try{

        const response = await apiRequest(`/metas/${item.id}`,'DELETE')

        return response
    } catch(error){
        Alert.alert('Erro ao deletar meta')
    }
}