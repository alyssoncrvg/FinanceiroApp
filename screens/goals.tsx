import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

import { styleGoals } from '../styles/styleGoals';
import { UsefecthDataGoals } from '../logics/goalsScreenLogics';
import { useModalGoalsHandlres } from '../logics/goalsScreenLogics';
import { FormDataGoal } from '../interfaces/interfaces';
import { FlexModalGoal } from '../modal/modalGoal';
import { EditGoalModel } from '../modal/modalEditGoal';

interface FlexModalProps {
    modalVisible: boolean;
    onClose: () => void;
    fields: { name: string; placeholder: string; type: string }[];
    onSubmit: (formData: FormDataGoal) => void;
}


export function GoalsScreen({ navigation }: any) {

    const [ExpenseGoals, setExpenseGoals] = useState(false);
    const [ModalGoal, setModalGoal] = useState(false);
    const [editModalGoal, setEditModalGoal] = useState(false);
    const [itemUpdated, setItemUpdated] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<FormDataGoal | null>(null);

    const { dataGoals } = UsefecthDataGoals(ExpenseGoals); // Espera os dados
    const { addModelGoal, closeModalGoal, handleAddGoal } = useModalGoalsHandlres(setModalGoal, setExpenseGoals)

    useEffect(() => {
        if (itemUpdated) {
            setExpenseGoals((prev) => !prev);
            setItemUpdated(false);
        }
    }, [itemUpdated]);

    const handleEditGoal = (goal: FormDataGoal) => {
        console.log(goal)
        setSelectedGoal(goal);
        setEditModalGoal(true);
    };

    console.log(dataGoals)

    return (
        <ScrollView style={styleGoals.scrollContent}>
            <View style={styleGoals.container}>
                {/* Cabeçalho */}
                <View style={styleGoals.header}>
                    <Text style={styleGoals.title}>Metas Financeiras</Text>
                    <TouchableOpacity style={styleGoals.newGoalButton} onPress={addModelGoal}>
                        <Text style={styleGoals.newGoalButtonText}>Nova Meta</Text>
                    </TouchableOpacity>
                </View>

                {/* Lista de Metas */}
                <View style={styleGoals.goalsContainer}>
                    {dataGoals.map((goal) => {
                        const progress = goal.targetAmount > 0 ? goal.currentAmount / goal.targetAmount : 0;

                        return (
                            <TouchableOpacity key={goal.id} onPress={() => handleEditGoal(goal)}>
                                <View key={goal.id} style={styleGoals.goalItem}>
                                    <View style={styleGoals.goalHeader}>
                                        <Ionicons name={goal.icon} size={32} color="black" />
                                        <Text style={styleGoals.goalName}>{goal.titulo}</Text>
                                        <Text style={styleGoals.goalTarget}>Meta: {goal.targetAmount.toFixed(2)}</Text>
                                    </View>
                                    <Progress.Bar
                                        progress={progress}
                                        width={null}
                                        color="#000"
                                        style={styleGoals.progressBar}
                                    />
                                    <Text style={styleGoals.goalAmount}>
                                        {goal.currentAmount.toFixed(2)} de {goal.targetAmount.toFixed(2)}
                                    </Text>
                                    <Text style={styleGoals.goalPercentage}>{(progress * 100).toFixed(0)}%</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>


                {/* Modal para adicionar nova meta */}
                <FlexModalGoal
                    modalVisible={ModalGoal}
                    onClose={closeModalGoal}
                    onSubmit={handleAddGoal}
                />

                {/* Modal para editar meta existente */}
                {selectedGoal && (
                    <EditGoalModel
                        modalVisible={editModalGoal}
                        onClose={() => setEditModalGoal(false)}
                        onSubmit={() => setItemUpdated(true)} // Atualiza flag para forçar refresh
                        item={selectedGoal} // Meta selecionada para edição
                        setItemUpdated={setItemUpdated} // Passa o setter para marcar atualização
                    />
                )}

            </View>
        </ScrollView>
    );
}
