import { Alert } from "react-native";
import { apiRequest } from "../../api/api";
import { expenses } from "../../interfaces/interfaces";


export const editExpenses = async (item: expenses) => {

    const { _id } = item;

    try{
        const response = await apiRequest(`/gastos/${_id}`, 'PATCH', {
            'novaDescricao': item.descricao,
            'valor': item.valor,
            'categoria': item.categoria
        })

        return response;
    } catch (error){
        Alert.alert('Erro ao editar carteira')
    }

}