import { apiRequest } from "../../api/api";

export const addWallet = async (banco: string, saldo: number) => {
    try {
        const response = await apiRequest('/carteiras', 'POST', {
            banco,
            saldo
        });
        console.log('Carteira adicionada:', response);
        return response;
    } catch (error) {
        console.error('Erro ao adicionar carteira:', error);
    }
};