import { Alert } from "react-native";
import { apiRequest } from "../../api/api";
import { FormDataGoal } from "../../interfaces/interfaces";


export const editGoal = async (item: FormDataGoal) => {
    try{

        const response = await apiRequest(`/metas/${item.id}`,'PATCH',{
            icon: item.icon, 
            meta: item.targetAmount, 
            titulo: item.titulo, 
            previsao: item.forecast, 
            valorGuardado: item.currentAmount,
        })

        return response

    } catch(error){
        Alert.alert('Erro ao editar meta')
    }
}