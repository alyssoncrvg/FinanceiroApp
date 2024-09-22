import { apiRequest } from "../../api/api";
import { expenses } from "../../interfaces/interfaces";


export const deleteExpense = async (expense: expenses) => {

    const { _id } = expense

    try{

        const response = await apiRequest(`/gastos/${_id}`, 'DELETE')

        console.log(response)

        return response;

    } catch(error){
        console.log(error)
    }

}