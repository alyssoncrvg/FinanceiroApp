import { useEffect, useState } from "react"
import { apiRequest } from "../api/api"
import { FormDataGoal } from "../interfaces/interfaces";
import { addGoal } from "../functions/POST/metas";


export const UsefecthDataGoals = (GoalsAdded: boolean) => {

    const [dataGoals, setDataGoals] = useState<any[]>([]);
    const fetchData = async () => {
        try {
            const goals = await apiRequest('/get/metas')
            const formatedGoals = goals.map((goal: any) => ({
                id: goal._id,
                categoria: goal.categoria,
                titulo: goal.titulo,
                // icon: a fazer,
                targetAmount: goal.meta,
                currentAmount: goal.valorGuardado,
                forecast: goal.previsao,
            }))

            setDataGoals(formatedGoals);

        } catch (error) {
            console.log(error)
            return { dataGoals: [] }
        }
    }

    useEffect(() => {
        fetchData();
    }, [GoalsAdded]); // Reexecuta o fetch sempre que `expenseAdded` mudar

    return { dataGoals }

}

export const useModalGoalsHandlres = (
    setModalGoal: React.Dispatch<React.SetStateAction<boolean>>,
    setGoalsAdded: React.Dispatch<React.SetStateAction<boolean>>
) => {
    
    const addModelGoal = () => setModalGoal(true);
    const closeModalGoal = () => setModalGoal(false);

    const handleAddGoal = async(formData: FormDataGoal) => {
        console.log(formData)
        const response = addGoal(formData.categoria, formData.titulo, formData.targetAmount,
            formData.forecast, formData.currentAmount
        );

        setGoalsAdded((prev)=>!prev)
        closeModalGoal()
    }


    return { addModelGoal, closeModalGoal, handleAddGoal }
}