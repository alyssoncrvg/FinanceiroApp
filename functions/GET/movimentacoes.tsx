import { apiRequest } from "../../api/api"


export const getMoviment = async (mesAno: string) => {
    try{
        const response = await apiRequest(`/get/movimentacoes/${mesAno}`, 'GET')
        return response
    } catch(error){
        console.log(error)
        return { entradas: 0, saidas: 0 };
    }
}