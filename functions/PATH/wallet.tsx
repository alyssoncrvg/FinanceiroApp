import { apiRequest } from "../../api/api";
import { Item } from "../../interfaces/interfaces";

export const editWallet = async (item: Item) => {
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