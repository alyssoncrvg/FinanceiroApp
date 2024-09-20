import { apiRequest } from "../../api/api";
import { FormDataInvestments } from "../../interfaces/interfaces";


export const addInvestments = async (formData: FormDataInvestments) => {

    const bolsa = formData.bolsa;
    const valor = formData.valor
    try{
        const response = await apiRequest('/investimentos', 'POST', {
            bolsa,
            valor,
        })

        console.log(response)

        return response

    } catch (error){
        console.log(error)
    }

}