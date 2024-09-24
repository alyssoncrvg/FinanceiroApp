import { Alert } from "react-native";
import { apiRequest } from "../../api/api";

export const addWallet = async (banco: string, saldo: number) => {
    try {
        const response = await apiRequest('/carteiras', 'POST', {
            banco,
            saldo
        });
        return response;
    } catch (error) {
        Alert.alert('Erro ao adicionar a carteira')
    }
};