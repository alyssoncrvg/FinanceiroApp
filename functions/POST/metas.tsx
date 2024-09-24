import { Alert } from "react-native";
import { apiRequest } from "../../api/api";

export const addGoal = async (icon:string, titulo: string, meta: number,
    previsao: Date, valorGuardado: number) => {
    try {

        const response = await apiRequest('/metas', 'POST', {
            icon,
            titulo,
            meta,
            previsao,
            valorGuardado,
        })

        return response

    } catch (error) {
        Alert.alert('Erro ao adicionar meta')
    }
}