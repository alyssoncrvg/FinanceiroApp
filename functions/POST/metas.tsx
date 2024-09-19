import { apiRequest } from "../../api/api";

export const addGoal = async (categoria: string, titulo: string, meta: number,
    previsao: Date, valorGuardado: number) => {
    try {

        const response = await apiRequest('/metas', 'POST', {
            categoria,
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