import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

import { styleGoals } from '../styles/styleGoals';
import { styleNavigation } from '../styles/styleNavigation';

export function GoalsScreen({ navigation }: any) {
    const goals = [
        { id: '1', name: 'Carro Novo', icon: 'car' as const, targetAmount: 98000, currentAmount: 88200 },
        { id: '2', name: 'Casa Nova', icon: 'home' as const, targetAmount: 98000, currentAmount: 88200 },
        { id: '3', name: 'Eletrônicos', icon: 'tv' as const, targetAmount: 98000, currentAmount: 88200 },
        { id: '4', name: 'Viagem', icon: 'airplane' as const, targetAmount: 98000, currentAmount: 88200 },
        { id: '5', name: 'Viagem', icon: 'airplane' as const, targetAmount: 98000, currentAmount: 88200 },
        { id: '6', name: 'Viagem', icon: 'airplane' as const, targetAmount: 98000, currentAmount: 88200 },
    ];

    return (
        <View style={styleGoals.container}>
            <ScrollView>
                {/* Cabeçalho */}
                <View style={styleGoals.header}>
                    <Text style={styleGoals.title}>Metas Financeiras</Text>
                    <TouchableOpacity style={styleGoals.newGoalButton}>
                        <Text style={styleGoals.newGoalButtonText}>Nova Meta</Text>
                    </TouchableOpacity>
                </View>

                {/* Lista de Metas */}
                <View style={styleGoals.goalsContainer}>
                    {goals.map((goal) => {
                        const progress = goal.currentAmount / goal.targetAmount;

                        return (
                            <View key={goal.id} style={styleGoals.goalItem}>
                                <View style={styleGoals.goalHeader}>
                                    <Ionicons name={goal.icon} size={32} color="black" />
                                    <Text style={styleGoals.goalName}>{goal.name}</Text>
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
                        );
                    })}
                </View>
            </ScrollView>

            {/* Barra de Navegação */}
            <View style={styleNavigation.navigationBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home" size={32} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Investments')}>
                    <Ionicons name="stats-chart" size={32} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Control')}>
                    <Ionicons name="pie-chart" size={32} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Ionicons name="cash" size={32} color="#007AFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
