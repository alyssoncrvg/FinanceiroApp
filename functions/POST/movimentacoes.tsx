import { apiRequest } from "../../api/api";

export const addMovent = async (value: number) => {
    try {
        const response = await apiRequest(`/movimentacoes`, 'POST', {
            value
        })

        return response

    } catch(error){
        console.log(error)
    }
}