import { apiRequest } from "../../api/api";
import { walletFormat } from "../../interfaces/interfaces";

export const editWallet = async (item: walletFormat) => {
    console.log(item)
    try{
        console.log(item.id)
        const response = await apiRequest(`/carteiras/${item.id}`, 'PATCH', {
            "novoBanco" : item.banco,
            "saldo": item.valor
        })

        return response

    } catch(error){
        console.log(error)
    }
}