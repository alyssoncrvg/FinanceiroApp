import { apiRequest } from "../../api/api";

export const addGoal = async (icon:string, titulo: string, meta: number,
    previsao: Date, valorGuardado: number) => {
    try {

        const response = await apiRequest('/metas', 'POST', {
            icon,
            titulo,
            meta,
            previsao,
            valorGuardado,
        })

        console.log('meta adicionada', response)
        return response

    } catch (error) {
        console.log(error)
    }
}