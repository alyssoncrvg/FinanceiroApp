import { apiRequest } from "../../api/api";
import { FormDataGoal } from "../../interfaces/interfaces";


export const editGoal = async (item: FormDataGoal) => {
    try{

        const response = await apiRequest(`/metas/${item.id}`,'PATCH',{
            icon: item.icon, 
            meta: item.targetAmount, 
            titulo: item.titulo, 
            previsao: item.forecast, 
            valorGuardado: item.currentAmount,
        })

        console.log('edicao feita',response)

        return response

    } catch(error){
        console.log(error)
    }
}