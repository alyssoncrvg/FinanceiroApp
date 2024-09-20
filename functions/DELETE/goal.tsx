import { apiRequest } from "../../api/api";
import { FormDataGoal } from "../../interfaces/interfaces";


export const deleteGoal = async (item: FormDataGoal) => {
    try{

        const response = await apiRequest(`/gastos/${item.id}`,'DELETE')

        console.log('Deletado meta', response)

        return response
    } catch(error){
        console.log(error)
    }
}