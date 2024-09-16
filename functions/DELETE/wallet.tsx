import { apiRequest } from "../../api/api";


export const deleteWallet = async (id: String) => {
    try{
        const response = await apiRequest(`/investimentos/${id}`, 'DELETE');

        return response;
        
    } catch (error){
        console.log(error)
    }
}