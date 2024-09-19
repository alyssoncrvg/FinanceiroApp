import { apiRequest } from "../../api/api";
import { Item } from "../../interfaces/interfaces";


export const deleteWallet = async (item: Item) => {
    console.log('delete: ', item)
    try{
        const response = await apiRequest(`/carteiras/${item.id}`, 'DELETE');

        return response;
        
    } catch (error){
        console.log(error)
    }
}