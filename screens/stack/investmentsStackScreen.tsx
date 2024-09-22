import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FormDataInvestments } from '../../interfaces/interfaces';
import CustomHeader from './customHeader';
import { InvestmentsScreen } from '../InvestmentsScreen';
import { DetailInvestmentScreen } from '../details/investmentsDetail';

type RootStackParamList = {
  InvestmentScreen: undefined;
  InvestmentDetails: { data: FormDataInvestments[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const InvestmentsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InvestmentScreen"
        component={InvestmentsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvestmentDetails"
        component={DetailInvestmentScreen}
        options={{
          header: () => <CustomHeader title="Detalhes dos Investimentos" />,
        }}
      />
    </Stack.Navigator>
  );
};
