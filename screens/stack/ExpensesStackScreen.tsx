import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExpensesScreen } from '../controle';
import ExpenseDetails from '../details/expensesDetails';
import { expenses, GroupedExpense } from '../../interfaces/interfaces';
import CustomHeader from './customHeader';
import { ExpenseItensDetails } from '../details/expenseItensDetails';


type RootStackParamList = {
  ExpensesScreen: undefined;
  ExpenseDetails: { data: GroupedExpense[] };
  ExpenseItensDetails: { group: string, data: expenses[] }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ExpensesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ExpensesScreen" 
        component={ExpensesScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ExpenseDetails" 
        component={ExpenseDetails} 
        options={{
          header: () => <CustomHeader title="Detalhes das Despesas" />,
        }} 
      />
      <Stack.Screen 
        name='ExpenseItensDetails'
        component={ExpenseItensDetails}
        options={{
            header: () => <CustomHeader title='' />
        }}
      />
    </Stack.Navigator>
  );
};

export default ExpensesStackNavigator;
