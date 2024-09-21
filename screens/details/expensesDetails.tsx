import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { expenses, GroupedExpense } from '../../interfaces/interfaces';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    ExpenseDetails: { data: GroupedExpense[] };
    ExpenseItensDetails: { group: string, data: expenses[] }
};

// Tipo para as propriedades da rota
type ExpenseDetailsRouteProp = RouteProp<RootStackParamList, 'ExpenseDetails'>;

// Tipo para as propriedades de navegação
type ExpenseDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExpenseDetails'>;

type Props = {
    route: ExpenseDetailsRouteProp;
};

const ExpenseDetails = ({ route }: Props) => {
    const { data } = route.params;

    // Usar o tipo correto para navegação
    const navigation = useNavigation<ExpenseDetailsNavigationProp>();

    const handlePieChartPress = (data: expenses[]) => {
        // Navegar para a tela ExpenseItensDetails
        navigation.navigate('ExpenseItensDetails', { group: data[0].categoria, data: data });
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {data.map((expense: GroupedExpense) => (
                    <TouchableOpacity key={expense.categoria} onPress={() => handlePieChartPress(expense.gastos)}>
                        <View style={styles.expenseItem}>
                            <Text style={styles.expenseName}>{expense.categoria}</Text>
                            <Text style={styles.expenseAmount}>R$ {expense.somaValue.toFixed(2)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 80,
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    expenseItem: {
        marginBottom: 15,
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
    },
    expenseName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    expenseAmount: {
        fontSize: 16,
        color: 'gray',
    },
});

export default ExpenseDetails;
