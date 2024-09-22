import { apiRequest } from "../../api/api";
import { FormDataInvestments } from "../../interfaces/interfaces";


export const deleteInvestment = async (investment: FormDataInvestments) => {
    const { _id } = investment
    console.log(_id)
    try{

        const response = await apiRequest(`/investments/${_id}`, 'DELETE')

        return response

    } catch(error) {
        console.log(error)
    }
}