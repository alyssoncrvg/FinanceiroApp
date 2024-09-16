import { apiRequest } from "../../api/api";

export const editWallet = async (id:string) => {

    try{
        console.log(id)
        const response = await apiRequest(`/carteiras/${id}`, 'PATCH')

        return response

    } catch(error){
        console.log(error)
    }
}