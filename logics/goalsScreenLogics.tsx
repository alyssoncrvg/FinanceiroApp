import { useEffect, useState } from "react"
import { apiRequest } from "../api/api"
import { FormDataGoal } from "../interfaces/interfaces";
import { addGoal } from "../functions/POST/metas";
import { Alert } from "react-native";


export const UsefecthDataGoals = (GoalsAdded: boolean) => {

    const [dataGoals, setDataGoals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const goals = await apiRequest('/get/metas')
            const formatedGoals = goals.map((goal: any) => ({
                id: goal._id,
                icon: goal.icon,
                categoria: goal.categoria,
                titulo: goal.titulo,
                // icon: a fazer,
                targetAmount: goal.meta,
                currentAmount: goal.valorGuardado,
                forecast: goal.previsao,
            }))

            setDataGoals(formatedGoals);

        } catch (error) {
            Alert.alert('Erro ao buscar metas')
            return { dataGoals: [] }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [GoalsAdded]); // Reexecuta o fetch sempre que `expenseAdded` mudar

    return { dataGoals, loading }

}

export const useModalGoalsHandlres = (
    setModalGoal: React.Dispatch<React.SetStateAction<boolean>>,
    setGoalsAdded: React.Dispatch<React.SetStateAction<boolean>>
) => {
    
    const addModelGoal = () => setModalGoal(true);
    const closeModalGoal = () => setModalGoal(false);

    const handleAddGoal = async(formData: FormDataGoal) => {
        const response = addGoal(formData.icon, formData.titulo, formData.targetAmount,
            formData.forecast, formData.currentAmount
        );

        setGoalsAdded((prev)=>!prev)
        closeModalGoal()
    }


    return { addModelGoal, closeModalGoal, handleAddGoal }
}